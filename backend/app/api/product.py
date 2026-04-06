from fastapi import APIRouter

router = APIRouter(prefix='/products', tags=['Products'])

@router.get('/')
async def get_catalog(category: str = None):
    return {'products': []}

@router.get('/{id}')
async def get_product(id: int):
    return {'id': id, 'name': 'sample item'}