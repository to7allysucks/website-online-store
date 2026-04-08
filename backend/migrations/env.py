from logging.config import fileConfig

from sqlalchemy import pool
import asyncio
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

import sys
from os.path import dirname, abspath

BASE_DIR = dirname(dirname(abspath(__file__)))
sys.path.insert(0, BASE_DIR)
sys.path.insert(0, f"{BASE_DIR}/app")

from models.user import User
from models.product import Product, ProductVariant, ProductImage
from models.cart import CartItem
from models.order import Order, OrderItem, ShippingAddress
from models.favorite import Favorite
from models.category import Category
from core.database import Base
from core.config import settings

target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = settings.DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = settings.DATABASE_URL

    connectable = async_engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    asyncio.run(run_async_migrations(connectable))

async def run_async_migrations(connectable):
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()

def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
