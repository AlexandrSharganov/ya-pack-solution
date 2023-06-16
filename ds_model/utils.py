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
