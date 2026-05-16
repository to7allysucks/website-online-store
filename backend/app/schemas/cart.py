from uuid import UUID
from pydantic import BaseModel, Field

from schemas.product import ProductResponse

class CartItemResponse(BaseModel):
    id: UUID
    variant_id: UUID
    quantity: int
    product: ProductResponse

    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    items: list[CartItemResponse]
    total_price: float

class CartItemCreate(BaseModel):
    variant_id: UUID
    quantity: int = Field(default=1, ge=1)

class CartItemUpdate(BaseModel):
    quantity: int = Field(ge=1)