from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from uuid import UUID

from models.product import Product, ProductVariant
from models.category import Category
from schemas.product import ProductFilterParams

class ProductService:

    @staticmethod
    async def get_filtered_products(
            db: AsyncSession,
            filters: ProductFilterParams
    ):
        query = select(Product).options(
            selectinload(Product.images),
            selectinload(Product.variants),
            selectinload(Product.category),
            selectinload(Product.collection)
        )

        if filters.min_price is not None:
            query = query.where(Product.price >= filters.min_price)
        if filters.max_price is not None:
            query = query.where(Product.price <= filters.max_price)
        if filters.search is not None:
            query = query.where(Product.name.ilike(f'%{filters.search}%'))
        if filters.category is not None:
            query = query.join(Product.category).where(Category.slug == filters.category)
        if filters.color is not None or filters.size is not None:
            query = query.join(Product.variants)
            if filters.color is not None:
                query = query.where(ProductVariant.color == filters.color)
            if filters.size is not None:
                query = query.where(ProductVariant.size == filters.size)

        query = query.distinct()

        count_query = select(func.count(Product.id.distinct()))
        total_result = await db.execute(count_query)
        total = total_result.scalar()

        query = query.limit(filters.limit).offset(filters.offset)

        result = await db.execute(query)
        products = result.scalars().all()

        items = []
        for product in products:
            main_img_url = 'https://placehold.co/300x400'
            for img in product.images:
                if img.is_main:
                    main_img_url = img.url
                    break

            available_colors = list(set([var.color for var in product.variants if var.color]))
            available_sizes = list(set([var.size for var in product.variants if var.size]))

            items.append({
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'category': product.category,
                'collection': product.collection,
                'main_image': main_img_url,
                'colors': available_colors,
                'sizes': available_sizes
            })

        return total, items

    @staticmethod
    async def get_product_by_id(db: AsyncSession, product_id: UUID):
        query = select(Product).options(
            selectinload(Product.images),
            selectinload(Product.variants),
            selectinload(Product.category),
            selectinload(Product.collection)
        )
        query = query.where(Product.id == product_id)
        result = await db.execute(query)

        product = result.scalars().one_or_none()
        if not product:
            raise HTTPException(status_code=404, detail='Not Found')
        return product
