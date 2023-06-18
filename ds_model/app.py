from fastapi import FastAPI
from model import predict
from pydantic_val import Order
import uvicorn

app = FastAPI()


@app.get("/")
def index():
    """Root"""
    return {"team_7": "ds_model"}


@app.get("/health")
def health():
    """Health check"""
    return {"status": "ok"}


@app.post("/recommend")
def recommend_pack(order: Order) -> dict:
    """Process the income order json
    and returns the recommended packages.

    Parameters
    ----------
    order : Order
        A json with all order's information


    Returns
    -------
    packages : dict
        A dictionary with all recommended packages
        and it's amounts.

    """
    order = order.dict()

    return {
        "order_key": order["order_key"],
        "package": predict(order),
        "status": "in_work"
    }


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8100)
