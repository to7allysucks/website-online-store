from uuid import UUID
from pydantic import BaseModel, Field

class CartProductResponse(BaseModel):
    id: UUID
    name: str
    price: float
    main_image: str | None

    class Config:
        from_attributes = True

class CartVariantResponse(BaseModel):
    id: UUID
    color: str | None
    size: str | None
    product: CartProductResponse

    class Config:
        from_attributes = True

class CartItemResponse(BaseModel):
    id: UUID
    quantity: int
    variant: CartVariantResponse

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