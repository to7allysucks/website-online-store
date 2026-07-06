from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from core.database import get_db
from core.security import hash_password, verify_password, create_access_token, create_refresh_token
from core.dependencies import get_current_user
from core.config import settings
from models.token import RefreshToken
from models.user import User
from schemas.token import Token
from schemas.user import UserRegister, UserLogin, UserResponse
from datetime import datetime, timedelta, timezone

router = APIRouter(prefix='/auth', tags=['Auth'])

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

    access_token = create_access_token({'sub': str(user.id)})
    refresh_token = create_refresh_token({'sub': str(user.id)})

    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    db_refresh_token = RefreshToken(token=refresh_token, user_id=user.id, expires_at=expires_at, is_revoked=False)
    db.add(db_refresh_token)
    await db.commit()

    return {'access_token': access_token, 'token_type': 'bearer', 'refresh_token': refresh_token}

@router.get('/me', response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
