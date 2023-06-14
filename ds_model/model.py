from utils import prep_json
from one_item import predict_one_item
from two_three_items import predict_two_three


def predict(order: dict) -> list:

    order_d, n_goods = prep_json(order)

    if n_goods == 1:
        return [{"package": predict_one_item(order_d),
                 "amount": 1}]

    elif n_goods in [2,3]:
        return [{"package": predict_two_three(order_d, n_goods),
                 "amount": 1}]

    else:
        return [{"package": "NONPACK",
                 "amount": 1}]


