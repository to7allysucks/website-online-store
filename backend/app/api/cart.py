from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from core.dependencies import get_current_user
from models.product import ProductVariant, Product
from schemas.cart import CartResponse, CartItemCreate, CartItemUpdate
from models.cart import CartItem
from models.user import User
from uuid import UUID

router = APIRouter(prefix='/api/cart', tags=['Cart'])

@router.get('/', response_model=CartResponse)
async def get_cart(
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    query = (
        select(CartItem)
        .where(CartItem.user_id == current_user.id)
        .options(
            selectinload(CartItem.variant)
            .selectinload(ProductVariant.product)
            .options(
                selectinload(Product.images),
                selectinload(Product.category),
                selectinload(Product.collection)
            )
        )
    )

    result = await db.execute(query)
    cart_items = result.scalars().all()

    total_price = 0
    for item in cart_items:
        total_price += item.quantity * float(item.variant.product.price)

    return {'items': cart_items, 'total_price': total_price}

@router.post('/items')
async def add_to_cart(
        payload: CartItemCreate,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    query = select(CartItem).where(CartItem.variant_id == payload.variant_id).where(CartItem.user_id == current_user.id)
    result = await db.execute(query)
    existing_item = result.scalars().first()

    if existing_item is not None:
        existing_item.quantity += payload.quantity
    else:
        new_item = CartItem(
            variant_id=payload.variant_id,
            quantity=payload.quantity,
            user_id=current_user.id
        )
        db.add(new_item)

    await db.commit()
    return {'message': 'Товар успешно добавлен в корзину'}

@router.delete('/items/{id}')
async def delete_from_cart(
        id: UUID,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    query = select(CartItem).where(CartItem.user_id == current_user.id).where(CartItem.id == id)
    result = await db.execute(query)
    item = result.scalars().first()

    if not item:
        raise HTTPException(status_code=404, detail='Not Found')
    await db.delete(item)
    await db.commit()
    return {'message': 'Товар удален из корзины'}

@router.patch('/items/{id}')
async def update_cart_item(
        id: UUID,
        payload: CartItemUpdate,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    query = select(CartItem).where(CartItem.user_id == current_user.id).where(CartItem.id == id)
    result = await db.execute(query)
    item = result.scalars().first()

    if not item:
        raise HTTPException(status_code=404, detail='Not Found')
    item.quantity = payload.quantity
    await db.commit()
    return {'message': 'Done.'}
