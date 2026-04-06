from fastapi import APIRouter

router = APIRouter(prefix='/catalog', tags=['Catalog'])

@router.get('/')
async def get_catalog(category: str = None):
    return {'catalog': []}

@router.get('/{id}')
async def get_product(id: int):
    return {'id': id, 'name': 'sample item'}