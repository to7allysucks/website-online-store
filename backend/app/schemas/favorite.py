from pydantic import BaseModel
from uuid import UUID
from schemas.product import ProductResponse

class FavoriteCreate(BaseModel):
    product_id: UUID

class FavoriteResponse(BaseModel):
    id: UUID
    product: ProductResponse

    class Config:
        from_attributes = True
