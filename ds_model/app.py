from fastapi import FastAPI
from model import predict
from pydantic_val import Order

app = FastAPI()

@app.get("/")
def index():
    return {"team_7": "ds_model"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.on_event("startup")
def startup_event():
    global ml_models
    global boundaries_dicts
    # тут загрузка ml моделей и других доп данных


@app.post("/recommend")
def recommend_pack(order: Order):
    order = order.dict()
    # pack = predict(order)
    # order["package"] = pack
    # order['status'] = "in_work"
    out = {"order_key": order["order_key"]}
    out['package'] = predict(order)
    out['status'] = "in_work"

    return out


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)


#uvicorn app:app --reload