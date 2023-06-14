from pydantic import BaseModel


class Item(BaseModel):
    sku_id: str
    amount: int
    dimension_a: float
    dimension_b: float
    dimension_c: float
    sku_wght: float
    cargotypes: list


class Order(BaseModel):
    order_key: str
    skus: list
    status: str
