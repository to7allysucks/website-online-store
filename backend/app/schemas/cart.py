from uuid import UUID
from pydantic import BaseModel

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