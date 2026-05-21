from pydantic import BaseModel, Field, model_validator
from enum import Enum
from uuid import UUID

class GenderEnum(str, Enum):
    MAN = 'man'
    WOMAN = 'woman'
    KID = 'kid'

class ProductImageResponse(BaseModel):
    id: UUID
    url: str
    is_main: bool

    class Config:
        from_attributes = True

class ProductVariantResponse(BaseModel):
    id: UUID
    color: str | None
    size: str | None
    stock: int

    class Config:
        from_attributes = True

class CategoryShortResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        from_attributes = True

class CollectionShortResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        from_attributes = True

class ProductDetailResponse(BaseModel):
    id: UUID
    name: str
    description: str | None
    price: float
    category: CategoryShortResponse | None = None
    collection: CollectionShortResponse | None = None
    images: list[ProductImageResponse]
    variants: list[ProductVariantResponse]

    class Config:
        from_attributes = True

class ProductFilterParams(BaseModel):
    limit: int = Field(default=20, ge=1, le=50)
    offset: int = Field(default=0, ge=0)
    category: str | None = None
    color: str | None = None
    size: str | None = None
    min_price: float | None = Field(default=None, ge=0)
    max_price: float | None = Field(default=None, ge=0)
    search: str | None = None
    gender: GenderEnum | None = None

    @model_validator(mode='after')
    def validate_prices(self):
        if self.min_price is not None and self.max_price is not None:
            if self.min_price > self.max_price:
                raise ValueError('Максимальная цена меньше минимальной')
        return self

class ProductResponse(BaseModel):
    id: UUID
    name: str
    description: str | None
    price: float
    category: CategoryShortResponse | None = None
    collection: CollectionShortResponse | None = None
    main_image: str | None
    colors: list[str]
    sizes: list[str]
    gender: GenderEnum

    class Config:
        from_attributes = True

class ProductListResponse(BaseModel):
    total: int
    items: list[ProductResponse]