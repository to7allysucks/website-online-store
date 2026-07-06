from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from core.database import get_db
from schemas.product import ProductFilterParams, ProductListResponse, ProductDetailResponse
from services.product import ProductService

router = APIRouter(prefix='/products', tags=['Products'])

@router.get('', response_model=ProductListResponse)
async def get_products(
    filters: ProductFilterParams = Depends(),
    db: AsyncSession = Depends(get_db)
):
    total, items = await ProductService.get_filtered_products(db=db, filters=filters)
    return {'total': total, 'items': items}

@router.get('/{id}', response_model=ProductDetailResponse)
async def get_product(
        id: UUID,
        db: AsyncSession = Depends(get_db)
):
    product = await ProductService.get_product_by_id(db=db, product_id=id)
    return product