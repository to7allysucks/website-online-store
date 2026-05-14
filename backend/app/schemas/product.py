from pydantic import BaseModel, Field
from uuid import UUID

class ProductResponse(BaseModel):
    id: UUID
    name: str
    description: str | None
    price: float
    category_id: UUID | None
    category_name: str | None
    collection_id: UUID | None
    collection_nam: str | None
    main_image: str | None
    colors: list[str]
    sizes: list[str]

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
    order_by: str | None = 'name'

class ProductListResponse(BaseModel):
    total: int
    items: list[ProductResponse]