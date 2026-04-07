from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from core.database import get_db
from core.security import hash_password, verify_password, create_access_token
from models.user import User
from schemas.user import UserRegister, UserLogin, UserResponse
from schemas.token import Token

from core.dependencies import get_current_user

router = APIRouter(prefix='/api/auth', tags=['Auth'])

@router.post('/register', response_model=UserResponse)
async def register(data: UserRegister, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail='Email already registered')

    user = User(
        email=data.email,
        password_hash=hash_password(data.password),
        first_name=data.first_name,
        last_name=data.last_name,
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.post('/login', response_model=Token)
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail='Invalid credentials')

    token = create_access_token({'sub': str(user.id)})
    return {'access_token': token, 'token_type': 'bearer'}

@router.get('/me', response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
