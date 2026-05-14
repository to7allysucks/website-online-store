import asyncio
import sys
import os
from random import randint
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import AsyncSessionLocal
from models.category import Category, Collection
from models.product import Product, ProductVariant, ProductImage

async def seed():
    async with AsyncSessionLocal() as db:
        categories = [
            Category(name='Shirts', slug='shirts'),
            Category(name='Jackets', slug='jackets'),
            Category(name='Shorts', slug='shorts'),
            Category(name='T-Shirts', slug='t-shirts'),
            Category(name='Jeans', slug='jeans'),
        ]
        # db.add_all(categories)
        # await db.flush()

        collections = [
            Collection(name='XIV Collection', slug='xiv-collection', season='23-24'),
        ]
        # db.add_all(collections)
        # await db.flush()

        products = [
            # T-shirts
            Product(
                name='Basic Slim Fit T-Shirt',
                description='Relaxed-fit shirt. Camp collar.',
                price=99,
                category_id=categories[3].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Basic Heavy Weight T-Shirt',
                description='Heavy weight cotton.',
                price=199,
                category_id=categories[3].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Oversized Graphic Tee',
                description='Front graphic print.',
                price=120,
                category_id=categories[3].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Vintage Wash Tee',
                description='Acid wash finish.',
                price=110,
                category_id=categories[3].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Boxy Fit Tee',
                description='Square cut silhouette.',
                price=95,
                category_id=categories[3].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Striped Marine Tee',
                description='Classic horizontal stripes.',
                price=105,
                category_id=categories[3].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Long Sleeve Jersey',
                description='Soft jersey fabric.',
                price=130,
                category_id=categories[3].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Pocket Essential Tee',
                description='Small chest pocket detail.',
                price=85,
                category_id=categories[3].id,
                collection_id=collections[0].id
            ),

            # Shirts
            Product(
                name='Classic Oxford Shirt',
                description='Button-down collar.',
                price=189,
                category_id=categories[0].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Flannel Check Shirt',
                description='Warm brushed cotton.',
                price=210,
                category_id=categories[0].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Linen Resort Shirt',
                description='Lightweight linen blend.',
                price=175,
                category_id=categories[0].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Denim Western Shirt',
                description='Snap buttons and yokes.',
                price=230,
                category_id=categories[0].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Corduroy Overshirt',
                description='Fine wale corduroy.',
                price=250,
                category_id=categories[0].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Silk Blend Shirt',
                description='Soft touch and sheen.',
                price=320,
                category_id=categories[0].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Grandad Collar Shirt',
                description='Minimalist design.',
                price=165,
                category_id=categories[0].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Evening Poplin Shirt',
                description='Formal crisp cotton.',
                price=195,
                category_id=categories[0].id,
                collection_id=collections[0].id
            ),

            # Jeans
            Product(
                name='Soft Wash Straight Fit Jeans',
                description='Straight fit jeans with soft wash.',
                price=199,
                category_id=categories[4].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Raw Selvedge Denim',
                description='Rigid indigo denim.',
                price=350,
                category_id=categories[4].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Loose Fit Carpenter',
                description='Side pockets and loops.',
                price=240,
                category_id=categories[4].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Tapered Black Jeans',
                description='Deep black stay-color.',
                price=210,
                category_id=categories[4].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Distressed Slim Jeans',
                description='Rip and repair details.',
                price=280,
                category_id=categories[4].id,
                collection_id=collections[0].id),
            Product(
                name='Grey Acid Wash Jeans',
                description='Vintage grey fade.',
                price=220,
                category_id=categories[4].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Dad Fit Light Jeans',
                description='Classic 90s wash.',
                price=190,
                category_id=categories[4].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Skate Baggy Denim',
                description='Extra wide leg.',
                price=235,
                category_id=categories[4].id,
                collection_id=collections[0].id
            ),

            # Jackets
            Product(
                name='Bomber Flight Jacket',
                description='Nylon water-resistant.',
                price=450,
                category_id=categories[1].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Trucker Denim Jacket',
                description='Classic denim outer.',
                price=380,
                category_id=categories[1].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Wool Harrington',
                description='Minimalist wool blend.',
                price=520,
                category_id=categories[1].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Quilted Puffer',
                description='Warm synthetic fill.',
                price=590,
                category_id=categories[1].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Technical Windbreaker',
                description='Lightweight shell.',
                price=290,
                category_id=categories[1].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Biker Leather Jacket',
                description='Genuine grain leather.',
                price=890,
                category_id=categories[1].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Field Utility Jacket',
                description='Multi-pocket canvas.',
                price=420,
                category_id=categories[1].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Coach Jacket',
                description='Snap front closure.',
                price=270,
                category_id=categories[1].id,
                collection_id=collections[0].id
            ),

            # Shorts
            Product(
                name='Chino Tailored Shorts',
                description='Above knee slim fit.',
                price=140,
                category_id=categories[2].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Cargo Tech Shorts',
                description='Utility side pockets.',
                price=160,
                category_id=categories[2].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Jersey Sweat Shorts',
                description='Soft loopback cotton.',
                price=90,
                category_id=categories[2].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Swim Shorts Logo',
                description='Mesh lined quick dry.',
                price=115,
                category_id=categories[2].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Linen Pleated Shorts',
                description='Breathable formal look.',
                price=170,
                category_id=categories[2].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Denim Cut-off Shorts',
                description='Raw edge hem.',
                price=130,
                category_id=categories[2].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Running Performance',
                description='Stretch tech fabric.',
                price=110,
                category_id=categories[2].id,
                collection_id=collections[0].id
            ),
            Product(
                name='Seersucker Shorts',
                description='Textured summer fabric.',
                price=150,
                category_id=categories[2].id,
                collection_id=collections[0].id
            ),
        ]
        db.add_all(products)
        await db.flush()

        colors = ['000000', 'ffffff']
        sizes = ['XS', 'S', 'M', 'L', 'XL', '2X']

        variants = []
        for product in products:
            for color in colors:
                for size in sizes:
                    variants.append(ProductVariant(product_id=product.id, color=color, size=size, stock=randint(10, 50)))
        db.add_all(variants)
        await db.flush()

        images = []
        for product in products:
            images.append(
                ProductImage(
                    product_id=product.id,
                    url='https://placehold.co/300x400',
                    is_main=True
                ))
        db.add_all(images)

        await db.commit()
        print('Done.')

if __name__ == "__main__":
    asyncio.run(seed())