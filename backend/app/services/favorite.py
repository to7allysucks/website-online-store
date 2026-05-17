from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from models.favorite import Favorite
from models.product import Product

class FavoriteService:

    @staticmethod
    async def get_user_favorites(db: AsyncSession, user_id: UUID):
        query = (
            select(Favorite)
            .where(Favorite.user_id == user_id)
            .options(
                selectinload(Favorite.product).selectinload(Product.images),
                selectinload(Favorite.product).selectinload(Product.variants),
                selectinload(Favorite.product).selectinload(Product.category),
                selectinload(Favorite.product).selectinload(Product.collection)
            )
        )
        result = await db.execute(query)
        items = result.scalars().all()

        return items

    @staticmethod
    async def add_item_to_favorites(db: AsyncSession, user_id: UUID, product_id: UUID):
        query = select(Favorite).where(Favorite.product_id == product_id).where(Favorite.user_id == user_id)
        result = await db.execute(query)
        favorite_item = result.scalars().first()

        if favorite_item is not None:
            return favorite_item
        new_favorite_item = Favorite(
            user_id=user_id,
            product_id=product_id
        )
        db.add(new_favorite_item)
        await db.commit()
        return new_favorite_item

    @staticmethod
    async def delete_item_from_favorites(db: AsyncSession, user_id: UUID, product_id: UUID):
        query = select(Favorite).where(Favorite.product_id == product_id).where(Favorite.user_id == user_id)
        result = await db.execute(query)
        favorite_item = result.scalars().first()

        if favorite_item is None:
            raise HTTPException(status_code=404, detail='Not Found')
        await db.delete(favorite_item)
        await db.commit()
