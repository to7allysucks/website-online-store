from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.category import Category

async def get_categories(db: AsyncSession):
    query = select(Category)
    result = await db.execute(query)
    categories = result.scalars().all()
    return categories