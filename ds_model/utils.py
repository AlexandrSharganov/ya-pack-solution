import numpy as np
import os
import json
import pickle


def prep_json(order: dict) -> tuple:
    """Get a new dict with right keys names and total items amount"""
    init_atts = ['sku_id',
                 'sku_wght',
                 'dimension_a',
                 'dimension_b',
                 'dimension_c',
                 'cargotypes',
                 'amount']
    new_atts = ['sku',
                'goods_wght',
                'a', 'b', 'c',
                'cargotypes',
                'count']

    out, n_goods = {}, 0
    out['orderkey'] = order['order_key']
    out['items'] = []
    for item in order['skus']:
        sku = {a: item[b] for a, b in zip(new_atts, init_atts)}
        out['items'].append(sku)
        n_goods += item['amount']

    return tuple([out, n_goods])


def cook_features(order: dict) -> np.array:
    """Get features array for an order"""
    query = order.copy()
    # список товаров
    goods = []
    # в заказе может быть разное количество единиц товаров
    for item in query['items']:
        # считаю объем
        item['sku_vol'] = round(item['a'] * item['b'] * item['c'], 2)
        # умножаю товар на его количество чтобы в списке было нужное количество
        goods += [item] * item['count']

    features, all_dims = [], []  # все размеры для поиска минимального и максимального
    total_vol, total_wght = 0, 0
    # фичи каждого товара
    for item in sorted(goods, key=lambda x: x['sku_vol']):
        features.append(item['goods_wght'])
        total_wght += item['goods_wght']  # общий вес
        dims = sorted([item['a'], item['b'], item['c']],
                      reverse=True)  # отсортированные размеры
        features += dims
        all_dims += dims
        features.append(item['sku_vol'])
        total_vol += item['sku_vol']  # общий объем
    # добавляю общие фичи товаров
    features += [total_vol, total_wght, min(all_dims), max(all_dims)]

    return np.array(features, dtype='float16')


def get_cheapest(s:set) -> str:
    """Get cheapest item from set"""
    if not s:
        return 'NONPACK'

    with open(f'{os.getcwd()}/ds_model/models/prices_dict.pkl', 'rb') as handler:
        prices = pickle.load(handler)

    return sorted(s, key=lambda x: prices.get(x, 1e10))[0]

"""
def get_packed(jsn: dict, count:int = 1):
    """Get a packages where goods will fit in
    works for 1-2-3 items in one order"""
    if count > 3:
        return None
    dt = json.load(open(f'{os.getcwd()}/ds_model/models/borders_data.json', 'r'))['data'][count]
    rec_pack = []
    sorted_abc_temp = []
    # собираем все товары в виде списка [a, b, c]
    for sku in range(len(jsn['items'])):
        sorted_abc_temp.append(sorted([jsn['items'][sku]['a'],
                                       jsn['items'][sku]['b'],
                                       jsn['items'][sku]['c']]))
        # минимальный размер умножаем на количество (складываем друг на друга)
        sorted_abc_temp[sku][0] *= jsn['items'][sku]['count']
    sorted_abc = sorted(sorted_abc_temp[0])
    # складываем разные товары по минимальной размерности
    # из остальных размерностей выбираем максимум (как палки)
    for i in range(1, len(sorted_abc_temp)):
        sorted_abc[0] += sorted(sorted_abc_temp[i])[0]
        sorted_abc[1] = max(sorted_abc_temp[i][1], sorted_abc[1])
        sorted_abc[2] = max(sorted_abc_temp[i][2], sorted_abc[2])
    # объем
    total_volume = sorted_abc[0] * sorted_abc[1] * sorted_abc[2]
    # подбор
    for pack in dt:
        if ((dt[pack]['borders'][0][0] <= sorted_abc[0] <= dt[pack]['borders'][0][1])
             and (dt[pack]['borders'][1][0] <= sorted_abc[1] <= dt[pack]['borders'][1][1])
             and (dt[pack]['borders'][2][0] <= sorted_abc[2] <= dt[pack]['borders'][2][1])
             and (dt[pack]['vol_borders'][0] <= total_volume <= dt[pack]['vol_borders'][1])):
            rec_pack.append(pack)
    return tuple(rec_pack)
"""