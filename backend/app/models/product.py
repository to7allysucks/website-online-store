from sqlalchemy import Column, String, Numeric, Boolean, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from core.database import Base
import uuid

class Product(Base):
    __tablename__ = 'products'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Numeric(10, 2), nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey('categories.id'))

    variants = relationship('ProductVariant', back_populates='product')
    images = relationship('ProductImage', back_populates='product')

class ProductVariant(Base):
    __tablename__ = 'product_variants'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey('products.id'))
    color = Column(String)
    size = Column(String)
    stock = Column(Integer, default=0)

    product = relationship('Product', back_populates='variants')

class ProductImage(Base):
    __tablename__ = 'product_images'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey('products.id'))
    variant_id = Column(UUID(as_uuid=True), ForeignKey('product_variants.id'), nullable=True)
    url = Column(String, nullable=False)
    is_main = Column(Boolean, default=False)

    product = relationship('Product', back_populates='images')