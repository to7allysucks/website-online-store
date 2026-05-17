from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from core.database import get_db
from core.dependencies import get_current_user
from models.user import User
from schemas.cart import CartResponse, CartItemCreate, CartItemUpdate
from services.cart import CartService

router = APIRouter(prefix='/api/cart', tags=['Cart'])

@router.get('/', response_model=CartResponse)
async def get_cart(
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    cart_items, total_price = await CartService.get_user_cart(db=db, user_id=current_user.id)

    return {'items': cart_items, 'total_price': total_price}

@router.post('/items')
async def add_to_cart(
        payload: CartItemCreate,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    await CartService.add_item_to_cart(db=db, payload=payload, user_id=current_user.id)
    return {'message': 'Товар успешно добавлен в корзину'}

@router.delete('/items/{id}')
async def delete_from_cart(
        id: UUID,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    await CartService.delete_item_from_cart(
        db=db,
        user_id=current_user.id,
        item_id=id
    )
    return {'message': 'Товар удален из корзины'}

@router.patch('/items/{id}')
async def update_cart_item(
        id: UUID,
        payload: CartItemUpdate,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    await CartService.update_item_quantity(
        db=db,
        user_id=current_user.id,
        item_id=id,
        payload=payload
    )
    return {'message': 'Количество товара обновлено'}
