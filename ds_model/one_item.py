import pickle
import pandas as pd
import numpy as np
from utils import get_cheapest, get_packed

cb_features = ['goods_wght', 'sku_volume', 'min_sku_dim',
               'max_sku_dim', 'density', 'a', 'b', 'c',
               '200','290','291','292','320', '340',
               '360','700', '799']

knn_features = ['goods_wght','a', 'b', 'c','sku_volume',
                'min_sku_dim', 'max_sku_dim', 'density']

boxes = ['YMA', 'YMC', 'YME', 'YMF', 'YMG', 'YMH', 'YMJ',
         'YML', 'YMN', 'YMO', 'YMP', 'YMQ', 'YMR',  'YMS',
         'YMU', 'YMV', 'YMW',  'YMХ', 'YMX', 'YMY']

packages = ['MYF', 'MYA', 'MYB', 'MYC', 'MYD', 'MYE']


def cook_features_one(query: dict, dataframe:bool = True) -> pd.DataFrame:
    """Prepares the features for models.
    Return a pandas DataFrame for catboost and KNN
    """
    with open('models/cargotypes_dict.pkl', 'rb') as handler:
        cargotype_dict = pickle.load(handler)
    cargotypes = list(set(cargotype_dict.values()))
    item = query['items'][0].copy()
    item['sku_volume'] = round(item['a'] * item['b'] * item['c'], 2)
    item['min_sku_dim'] = min([item['a'], item['b'], item['c']])
    item['max_sku_dim'] = max([item['a'], item['b'], item['c']])
    if item['sku_volume']:
        item['density'] = round(item['goods_wght'] / item['sku_volume'], 2)
    else:
        item['density'] = 0
    if not dataframe:
        item.pop('cargotypes')
        item.pop('count')
        return item
    item['cargotypes'] = list(set(map(lambda x: cargotype_dict.get(x, '0'),
                                      item['cargotypes'])))

    for cargotype in cargotypes:
        item[cargotype] = (cargotype in item['cargotypes']) * 1

    item.pop('cargotypes')
    item.pop('count')
    return pd.DataFrame(item, index=[0])


def get_knn_top(sample: np.array, k: int = 3, th: float = 0.2) -> list:
    """Gets features of sku and returns top k appropriate packs
    """
    with open('models/knn_scaler_dict.pkl', 'rb') as handler:
        knn_clf, std_scaler, pack_dict_inv = pickle.load(handler)
    sample_for_knn = std_scaler.transform(sample.values)
    preds_knn_probas = knn_clf.predict_proba(sample_for_knn)[0]
    probs_packs = [(p, pack_dict_inv[cl]) for p, cl
                   in zip(preds_knn_probas, knn_clf.classes_)]
    knn_recommendations = sorted(probs_packs, reverse=True)
    top = [pack[1] for pack in knn_recommendations if pack[0] >= th]
    return top[:k]


def predict_one_item(query: dict, n_goods:int = 1) -> str:
    """ Recommends the carton type for the sku
    """
    # из исходного запроса с заказом выделяем список с карготипами
    item_cargotypes = query['items'][0]['cargotypes']
    # 340 - не требует упаковки
    # 292 - крупногабаритный товар
    if ('340' in item_cargotypes or
        '292' in item_cargotypes):
        return 'NONPACK'
    # 360 - требует упаковку в пленку
    if '360' in item_cargotypes:
        return "STRETCH"
    pack_need = False
    # Для всех этих карготипов считаем что нужна упаковка
    # 950 пачкается и мокрое
    # 700 продукты питания
    # 460 пахучий
    # 960 впитывает запах
    # 40 дорогие вещи
    if set(item_cargotypes) & set(['950', '700', '460', '310','960', '60']):
        pack_need = True
    # формируем признаки для catboost
    sample = cook_features_one(query)
    # если по первичным карготипам считаем что упаковка не нужна, то
    # запускаем классификатор
    if not pack_need:
        with open('models/catboost_pack_nonpack.pkl', 'rb') as handler:
            cb = pickle.load(handler)
        pack_need_cb = cb.predict(sample[cb_features])
        if not pack_need_cb:
            return 'NONPACK'
    # в случае если упаковка нужна, ищем соседей с KNN
    knn_ans = get_knn_top(sample[knn_features])
    # а так же берем топ 3 самых дешевых из упаковок которые подходят по размеру
    #item = cook_features_one(query, dataframe=False)
    algo_ans = get_packed(query, n_goods)[:3]
    # и берем объединение множеств
    knn_algo_union = set(algo_ans) & set(knn_ans)
    #если в объединении только один ответ - выдаем его
    if len(knn_algo_union) == 1:
        return list(knn_algo_union)[0]
    # проверяем тип рекомендуемой упаковки
    pack_type = None
    # хрупкое только в коробки 310
    if set(item_cargotypes) & set(['310']):
        pack_type = boxes
    # пахучее и пачкающееся - в пакеты 950, 460
    if set(item_cargotypes) & set(['950', '460']):
        pack_type = packages
    if pack_type:
        ans = get_cheapest(set([pack for pack in knn_algo_union
                                if pack in pack_type]))
        if ans: #ответ в объединении knn и алго
            return ans
        # ответа нет в объединении - ищем во всех подходящих по размерам
        ans = get_cheapest(set([pack for pack in get_packed(item)
                                if pack in pack_type]))
        return ans
    # если коробка или пакет не так однозначно определены, то
    # берем самое дешевое из подходящих
    return get_cheapest(knn_algo_union)