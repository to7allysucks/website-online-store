from fastapi import APIRouter

router = APIRouter(prefix='/categories', tags=['Categories'])

router.get('/categories')
async def get_categories():
    return []