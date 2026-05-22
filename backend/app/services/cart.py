from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from uuid import UUID

from models.product import Product, ProductVariant
from models.cart import CartItem
from schemas.cart import CartItemCreate, CartItemUpdate


class CartService:
    @staticmethod
    async def get_user_cart(db: AsyncSession, user_id: UUID):
        query = (
            select(CartItem)
            .where(CartItem.user_id == user_id)
            .options(
                selectinload(CartItem.variant)
                .selectinload(ProductVariant.product)
                .options(
                selectinload(Product.images),
                    selectinload(Product.category),
                )
            )
        )

        result = await db.execute(query)
        cart_items = result.scalars().all()

        total_price = 0
        items = []

        for item in cart_items:
            product = item.variant.product
            total_price += item.quantity * float(product.price)

            main_image = next(
                (img.url for img in product.images if img.is_main),
                None
            )

            items.append({
                'id': item.id,
                'quantity': item.quantity,
                'variant': {
                    'id': item.variant.id,
                    'color': item.variant.color,
                    'size': item.variant.size,
                    'product': {
                        'id': product.id,
                        'name': product.name,
                        'price': float(product.price),
                        'main_image': main_image,
                    }
                }
            })

        return items, total_price

    @staticmethod
    async def add_item_to_cart(db: AsyncSession, user_id: UUID, payload: CartItemCreate):
        query = select(CartItem).where(CartItem.variant_id == payload.variant_id).where(
            CartItem.user_id == user_id)
        check_query = select(ProductVariant).where(ProductVariant.id == payload.variant_id)
        check_result = await db.execute(check_query)
        variant = check_result.scalars().first()

        if not variant:
            raise HTTPException(status_code=404, detail='Not Found')
        stock = variant.stock

        result = await db.execute(query)
        existing_item = result.scalars().first()

        new_item = None
        if existing_item is not None:
            if existing_item.quantity + payload.quantity > stock:
                raise HTTPException(status_code=400, detail='Bad Request')
            existing_item.quantity += payload.quantity
        else:
            if payload.quantity > stock:
                raise HTTPException(status_code=400, detail='Bad Request')
            new_item = CartItem(
                variant_id=payload.variant_id,
                quantity=payload.quantity,
                user_id=user_id
            )
            db.add(new_item)
        await db.commit()
        await db.refresh(existing_item or new_item)
        return existing_item or new_item

    @staticmethod
    async def update_item_quantity(db: AsyncSession, user_id: UUID, item_id: UUID, payload: CartItemUpdate):
        query = select(CartItem).where(CartItem.user_id == user_id).where(CartItem.id == item_id).options(selectinload(CartItem.variant))
        result = await db.execute(query)
        item = result.scalars().first()

        if not item:
            raise HTTPException(status_code=404, detail='Not Found')
        if payload.quantity > item.variant.stock:
            raise HTTPException(status_code=400, detail='Bad Request')
        item.quantity = payload.quantity
        await db.commit()

    @staticmethod
    async def delete_item_from_cart(db: AsyncSession, user_id: UUID, item_id: UUID):
        query = select(CartItem).where(CartItem.user_id == user_id).where(CartItem.id == item_id)
        result = await db.execute(query)
        item = result.scalars().first()

        if not item:
            raise HTTPException(status_code=404, detail='Not Found')
        await db.delete(item)
        await db.commit()