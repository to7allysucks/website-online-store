from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.dependencies import get_current_user
from models.user import User
from schemas.order import OrderResponse, OrderCreate
from services.order import OrderService

router = APIRouter(prefix='/orders', tags=['Orders'])

@router.post('', response_model=OrderResponse)
async def create_order(payload: OrderCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    order = await OrderService.create_order(
        db=db, payload=payload, user_id=current_user.id
    )
    return order