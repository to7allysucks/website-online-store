from fastapi import APIRouter

router = APIRouter(prefix='/auth')

@router.post
async def post_