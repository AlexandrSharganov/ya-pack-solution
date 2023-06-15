from utils import cook_features, get_packed, get_cheapest
import pickle
import os


def ml_two_three(query: dict, n_goods: int, top_k=3) -> list:
    """Get predictions for two or three goods in order"""
    # делаю фичи и считаю количество товаров в заказе
    features = cook_features(query)

    # нужные модели в зависимости от кол-ва товаров
    file = "two" if n_goods == 2 else "three"
    with open(f'{os.getcwd()}/ds_model/models/{file}_goods_models.pkl', 'rb') as handler:
        tools = pickle.load(handler)

    # классификатор для определения входит ли в самые популярные
    # и список остальных упаковок
    cb, rest_packs = tools[0][0], tools[0][1]

    # если 0 то в самых популярных, в противном случае rest_packs
    if cb.predict(features):
        return rest_packs
    # сюда складываю код упаковки и результаты предсказаний моделей
    multiclass_result = []
    for model in tools[1]:
        multiclass_result.append((model[0],
                                  model[1].predict_proba(features)[1]))
    # возвращаю топ k из отсортированного списка
    result_packs = sorted(multiclass_result,
                          key=lambda x: x[1],
                          reverse=True)[:top_k]
    return [pack[0] for pack in result_packs]

def predict_two_three(query: dict, top_k: int = 3, n_goods: int = 2) -> str:
    #
    # Добавить проверку карготипов
    # Проверить крайние случаи
    #
    cargotypes = set([cargo for item in query['items']
                      for cargo in item['cargotypes']])

    ml_preds = ml_two_three (query, n_goods)
    algo_preds = get_packed(query, n_goods)
    # проверяю если ml предсказания это не самые популярыне упаковки
    if len(ml_preds)>top_k:
        #прохожусь по результатам алго, они отсортированы по цене
        for pack in algo_preds:
            #первый встречающийся в ml результатах - самый дешевый
            if pack in ml_preds:
                return pack

    #пересечение ml и алго результатов
    ml_alg = set(ml_preds) & set(algo_preds[:3])

    return get_cheapest(ml_alg)


