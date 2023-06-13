from pydantic import BaseModel


class Item(BaseModel):
    sku_id: str
    amount: int
    dimention_a: float
    dimention_b: float
    dimention_c: float
    sku_wght: float


class Order(BaseModel):
    order_id: str
    skus: list[Item]
    status: str