from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from core.database import get_db
from core.security import decode_token
from models.user import User
from jose import JWTError, ExpiredSignatureError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/auth/login')

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    try:
        payload = decode_token(token)
        user_id = payload.get('sub')
        if not user_id:
            raise HTTPException(status_code=401, detail='Invalid token')
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token has expired')
    except JWTError:
        raise HTTPException(status_code=401, detail='Invalid token')
    except Exception:
        raise HTTPException(status_code=401, detail='Authentication error')

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401, detail='User not found')
    return user
