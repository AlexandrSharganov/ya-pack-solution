from fastapi import FastAPI
from model import predict
from pydantic_val import Item, Order

app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/recommend")
def recommend_pack(order:Order):
    order = order.dict()
    pack = predict()
    order["package"] = pack
    order['status'] = "in_work"
    return order


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)


#uvicorn app:app --reload