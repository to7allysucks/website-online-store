from fastapi import HTTPException
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from models.cart import CartItem
from models.product import ProductVariant, Product
from models.order import Order, OrderItem, ShippingAddress
from schemas.order import OrderCreate


class OrderService:

    @staticmethod
    async def create_order(
            db: AsyncSession,
            user_id: UUID,
            payload: OrderCreate
    ):
        query = (select(CartItem).where(CartItem.user_id == user_id)
                 .options(selectinload(CartItem.variant).selectinload(ProductVariant.product)))
        result = await db.execute(query)
        cart_items = result.scalars().all()
        if not cart_items:
            raise HTTPException(status_code=400, detail='Bad Request')
        subtotal = 0
        for item in cart_items:
            subtotal += item.quantity * item.variant.product.price
        if subtotal > 400:
            shipping_cost = 0.0
        else:
            shipping_cost = 10.0
        total = subtotal + shipping_cost
        new_order = Order(
            user_id=user_id,
            status='pending',
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            total=total
        )
        db.add(new_order)
        await db.flush()

        for item in cart_items:
            order_item = OrderItem(
                order_id=new_order.id,
                variant_id=item.variant_id,
                quantity=item.quantity,
                price_at_purchase=item.variant.product.price
            )
            db.add(order_item)
            if item.variant.stock < item.quantity:
                raise HTTPException(status_code=400, detail='Bad Request')
            item.variant.stock -= item.quantity

        shipping_address = ShippingAddress(
            order_id=new_order.id,
            **payload.model_dump()
        )
        db.add(shipping_address)

        delete_cart_query = delete(CartItem).where(CartItem.user_id == user_id)
        await db.execute(delete_cart_query)
        await db.commit()
        return new_order