from fastapi import APIRouter

router = APIRouter(prefix='/products', tags=['Products'])

@router.get('/products')
async def get_products(category: str = None):
    return {'products': []}

@router.get('/products/{id}')
async def get_product(id: int):
    return {'id': id, 'name': 'sample item'}

