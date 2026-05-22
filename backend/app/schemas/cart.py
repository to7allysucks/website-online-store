from uuid import UUID
from pydantic import BaseModel, Field

# продукт внутри корзины — только нужные поля
class CartProductResponse(BaseModel):
    id: UUID
    name: str
    price: float
    main_image: str | None

    class Config:
        from_attributes = True

# вариант внутри корзины
class CartVariantResponse(BaseModel):
    id: UUID
    color: str | None
    size: str | None
    product: CartProductResponse

    class Config:
        from_attributes = True

# один элемент корзины
class CartItemResponse(BaseModel):
    id: UUID
    quantity: int
    variant: CartVariantResponse

    class Config:
        from_attributes = True

# полный ответ корзины
class CartResponse(BaseModel):
    items: list[CartItemResponse]
    total_price: float

# что фронт отправляет при добавлении
class CartItemCreate(BaseModel):
    variant_id: UUID
    quantity: int = Field(default=1, ge=1)

# что фронт отправляет при изменении количества
class CartItemUpdate(BaseModel):
    quantity: int = Field(ge=1)