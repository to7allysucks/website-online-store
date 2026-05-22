import asyncio
import sys
import os
import uuid
from random import randint, choice
from sqlalchemy import text

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import AsyncSessionLocal
from models.category import Category, Collection


async def seed():
    async with AsyncSessionLocal() as db:
        print("Очистка базы данных...")
        await db.execute(
            text("TRUNCATE TABLE public.products, public.categories, public.collections RESTART IDENTITY CASCADE;"))
        await db.flush()

        print("Заполнение категорий и коллекций...")
        categories = [
            Category(name='Shirts', slug='shirts'),
            Category(name='Jackets', slug='jackets'),
            Category(name='Shorts', slug='shorts'),
            Category(name='T-Shirts', slug='t-shirts'),
            Category(name='Jeans', slug='jeans'),
        ]
        db.add_all(categories)
        await db.flush()

        collections = [
            Collection(name='XIV Collection', slug='xiv-collection', season='23-24'),
        ]
        db.add_all(collections)
        await db.flush()

        # Значения gender СТРОГО в верхнем регистре (ЗАГЛАВНЫМИ БУКВАМИ)
        raw_products = [
            # --- MAN ---
            {"id": uuid.uuid4(), "name": 'Men Classic White Tee',
             "desc": 'Premium heavy cotton t-shirt with a relaxed fit.', "price": 95, "gender": 'MAN',
             "cat": categories[3].id},
            {"id": uuid.uuid4(), "name": 'Men Graphic Street Tee',
             "desc": 'Oversized t-shirt featuring modern back print graphics.', "price": 115, "gender": 'MAN',
             "cat": categories[3].id},
            {"id": uuid.uuid4(), "name": 'Men Casual Linen Shirt',
             "desc": 'Lightweight breathable linen blend for summer days.', "price": 160, "gender": 'MAN',
             "cat": categories[0].id},
            {"id": uuid.uuid4(), "name": 'Men Denim Western Shirt',
             "desc": 'Classic indigo denim shirt with snap button closure.', "price": 190, "gender": 'MAN',
             "cat": categories[0].id},
            {"id": uuid.uuid4(), "name": 'Men Straight Rigid Jeans',
             "desc": 'Dark wash raw denim jeans with a straight-leg cut.', "price": 210, "gender": 'MAN',
             "cat": categories[4].id},
            {"id": uuid.uuid4(), "name": 'Men Slim Black Jeans',
             "desc": 'Stay-black stretch denim jeans in a modern slim fit.', "price": 185, "gender": 'MAN',
             "cat": categories[4].id},
            {"id": uuid.uuid4(), "name": 'Men Nylon Bomber Jacket',
             "desc": 'Water-resistant bomber jacket with zip utility pocket.', "price": 320, "gender": 'MAN',
             "cat": categories[1].id},
            {"id": uuid.uuid4(), "name": 'Men Rugged Corduroy Jacket',
             "desc": 'Vintage style corduroy jacket with soft sherpa lining.', "price": 290, "gender": 'MAN',
             "cat": categories[1].id},
            {"id": uuid.uuid4(), "name": 'Men Cargo Utility Shorts',
             "desc": 'Durable cotton twill shorts with spacious side pockets.', "price": 110, "gender": 'MAN',
             "cat": categories[2].id},
            {"id": uuid.uuid4(), "name": 'Men Chino Tailored Shorts',
             "desc": 'Smart-casual tailored chino shorts in beige tone.', "price": 125, "gender": 'MAN',
             "cat": categories[2].id},

            # --- WOMAN ---
            {"id": uuid.uuid4(), "name": 'Women Ribbed Crop Tee',
             "desc": 'Soft ribbed cotton t-shirt with a fitted silhouette.', "price": 80, "gender": 'WOMAN',
             "cat": categories[3].id},
            {"id": uuid.uuid4(), "name": 'Women Boyfriend Vintage Tee',
             "desc": 'Loose oversized t-shirt with an authentic washed finish.', "price": 99, "gender": 'WOMAN',
             "cat": categories[3].id},
            {"id": uuid.uuid4(), "name": 'Women Silk Relaxed Shirt',
             "desc": 'Elegant silk blend button-down shirt with a soft sheen.', "price": 240, "gender": 'WOMAN',
             "cat": categories[0].id},
            {"id": uuid.uuid4(), "name": 'Women Oversized Striped Shirt',
             "desc": 'Classic poplin cotton shirt with vertical blue stripes.', "price": 145, "gender": 'WOMAN',
             "cat": categories[0].id},
            {"id": uuid.uuid4(), "name": 'Women High-Waist Mom Jeans',
             "desc": 'Vintage inspired light wash jeans with a high rise.', "price": 195, "gender": 'WOMAN',
             "cat": categories[4].id},
            {"id": uuid.uuid4(), "name": 'Women Wide-Leg Denim',
             "desc": 'Relaxed wide-leg jeans made from sustainable cotton.', "price": 220, "gender": 'WOMAN',
             "cat": categories[4].id},
            {"id": uuid.uuid4(), "name": 'Women Cropped Denim Jacket',
             "desc": 'Stylishly cropped blue denim jacket with raw hems.', "price": 260, "gender": 'WOMAN',
             "cat": categories[1].id},
            {"id": uuid.uuid4(), "name": 'Women Oversized Leather Blazer',
             "desc": 'Soft faux leather blazer jacket for a sleek look.', "price": 380, "gender": 'WOMAN',
             "cat": categories[1].id},
            {"id": uuid.uuid4(), "name": 'Women Denim Cutoff Shorts',
             "desc": 'High-waisted distressed denim shorts with frayed edges.', "price": 90, "gender": 'WOMAN',
             "cat": categories[2].id},
            {"id": uuid.uuid4(), "name": 'Women Linen Flowy Shorts',
             "desc": 'Comfortable lightweight linen shorts with elastic waist.', "price": 105, "gender": 'WOMAN',
             "cat": categories[2].id},

            # --- KID ---
            {"id": uuid.uuid4(), "name": 'Kid Organic Cotton Tee',
             "desc": 'Hypoallergenic soft cotton t-shirt for everyday wear.', "price": 45, "gender": 'KID',
             "cat": categories[3].id},
            {"id": uuid.uuid4(), "name": 'Kid Colorful Pattern Tee',
             "desc": 'Bright t-shirt featuring fun playful graphic prints.', "price": 50, "gender": 'KID',
             "cat": categories[3].id},
            {"id": uuid.uuid4(), "name": 'Kid Smart Plaid Shirt',
             "desc": 'Miniature checkered flannel shirt, soft and warm.', "price": 85, "gender": 'KID',
             "cat": categories[0].id},
            {"id": uuid.uuid4(), "name": 'Kid Light Summer Shirt',
             "desc": 'Short sleeve breathable cotton shirt for hot days.', "price": 75, "gender": 'KID',
             "cat": categories[0].id},
            {"id": uuid.uuid4(), "name": 'Kid Elastic Waist Jeans',
             "desc": 'Comfy stretchy denim jeans with an easy elastic waistband.', "price": 110, "gender": 'KID',
             "cat": categories[4].id},
            {"id": uuid.uuid4(), "name": 'Kid Durable Denim Overalls',
             "desc": 'Classic denim overalls with adjustable shoulder straps.', "price": 135, "gender": 'KID',
             "cat": categories[4].id},
            {"id": uuid.uuid4(), "name": 'Kid Hooded Windbreaker',
             "desc": 'Lightweight rainproof jacket with a mesh lining.', "price": 150, "gender": 'KID',
             "cat": categories[1].id},
            {"id": uuid.uuid4(), "name": 'Kid Cozy Fleece Jacket',
             "desc": 'Super soft zip-up fleece jacket for chilly evenings.', "price": 120, "gender": 'KID',
             "cat": categories[1].id},
            {"id": uuid.uuid4(), "name": 'Kid Active Sweat Shorts',
             "desc": 'French terry cotton shorts perfect for playground fun.', "price": 55, "gender": 'KID',
             "cat": categories[2].id},
            {"id": uuid.uuid4(), "name": 'Kid Denim Roll-Up Shorts',
             "desc": 'Sturdy denim shorts with adjustable internal button waist.', "price": 65, "gender": 'KID',
             "cat": categories[2].id},
        ]

        conn = await db.connection()
        adapt_conn = await conn.get_raw_connection()
        asyncpg_conn = adapt_conn._connection

        print("Пакетное сохранение продуктов...")
        products_params = [
            (p["id"], p["name"], p["desc"], p["price"], p["cat"], collections[0].id, p["gender"])
            for p in raw_products
        ]

        # Запись капсом с приведением к вашему новому типу ENUM
        await asyncpg_conn.executemany(
            """
            INSERT INTO public.products (id, name, description, price, category_id, collection_id, gender)
            VALUES ($1, $2, $3, $4, $5, $6, CAST($7 AS genderenum))
            """,
            products_params
        )

        BLACK = '#000000'
        WHITE = '#ffffff'
        BLUE = '#250af5'
        GREEN = '#0af535'

        images_params = []
        variants_params = []
        image_counter = 1

        for p in raw_products:
            product_colors = [BLACK, WHITE, choice([BLUE, GREEN])]

            if p["gender"] == 'KID':
                sizes = ['S', 'M']
            else:
                sizes = ['S', 'M', 'L', 'XL']

            has_main_image = False

            for color in product_colors:
                image_id = 100 + image_counter
                image_counter += 1

                is_main_value = False
                if not has_main_image:
                    is_main_value = True
                    has_main_image = True

                first_variant_id = uuid.uuid4()

                for size_idx, size in enumerate(sizes):
                    v_id = first_variant_id if size_idx == 0 else uuid.uuid4()
                    variants_params.append(
                        (v_id, p["id"], size, color, randint(0, 30))
                    )

                images_params.append(
                    (uuid.uuid4(), p["id"], first_variant_id, f"https://picsum.photos{image_id}/600/800", is_main_value)
                )

        print("Пакетное сохранение вариантов...")
        await asyncpg_conn.executemany(
            """
            INSERT INTO public.product_variants (id, product_id, size, color, stock)
            VALUES ($1, $2, $3, $4, $5)
            """,
            variants_params
        )

        print("Пакетное сохранение картинок со связями...")
        await asyncpg_conn.executemany(
            """
            INSERT INTO public.product_images (id, product_id, variant_id, url, is_main)
            VALUES ($1, $2, $3, $4, $5)
            """,
            images_params
        )

        await db.commit()
        print("База Neon успешно заполнилась всеми тестовыми данными!")


if __name__ == '__main__':
    asyncio.run(seed())
