from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db

router = APIRouter(prefix='/api/products', tags=['Products'])

@router.get('/')
async def get_products(
    db: AsyncSession = Depends(get_db),
    category: str = Query(None),
    size: str = Query(None),
    color: str = Query(None),
    min_price: float = Query(None),
    max_price: float = Query(None),
    search: str = Query(None),
):
    return []

@router.get('/{id}')
async def get_product(id: int):
    return {'id': id, 'name': 'sample item'}