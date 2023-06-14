from pydantic import BaseModel


class Item(BaseModel):
    sku_id: str
    amount: int
    dimention_a: float
    dimention_b: float
    dimention_c: float
    sku_wght: float
    cargotypes: list[str]


class Order(BaseModel):
    order_key: str
    skus: list[Item]
    status: str