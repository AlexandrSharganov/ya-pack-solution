from utils import prep_json

def predict(order: dict) -> list:

    order_d, n_goods = prep_json(order)

    if n_goods == 1:
        return [{"package": "MYB"}]

    elif n_goods == 2:
        return [{"package": "MYC"}]

    elif n_goods == 3:
        return [{"package": "YMC"}]
    else:
        return [{"package": "NONPACK"}]


