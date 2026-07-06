from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from core.dependencies import get_current_user
from core.database import get_db
from models.user import User
from schemas.favorite import FavoriteResponse, FavoriteCreate
from services.favorite import FavoriteService

router = APIRouter(prefix='/favorites', tags=['Favorites'])

@router.get('', response_model=list[FavoriteResponse])
async def get_favorites(
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    items = await FavoriteService.get_user_favorites(db=db, user_id=current_user.id)
    return items

@router.post('')
async def add_to_favorites(
        payload: FavoriteCreate,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    await FavoriteService.add_item_to_favorites(db=db, user_id=current_user.id, product_id=payload.product_id)
    return {'message': 'Товар успешно добавлен в избранное'}

@router.delete('/{id}')
async def delete_from_favorites(
        id: UUID,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    await FavoriteService.delete_item_from_favorites(db=db, user_id=current_user.id, product_id=id)
    return {'message': 'Товар успешно удален из избранных'}