import numpy as np
import os
import pickle


def prep_json(order: dict) -> tuple:
    """Transforms the initial order json(dict) into a
    dictionary suitable for the further processing.
    Doesn't change the initial order dictionary.
    Also calculates the number of goods order contains.

    Parameters
    ----------
    order : dict
        Initial order dictionary


    Returns
    -------
    tuple(dict, int)
        Transformed order and number of goods

    """
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
    """Get features array for an order
    Needed for the orders containing 2-3 goods.
    The count field is no longer needed since the
    order list now contains as many of items as
    the initial order had regardless of recurring ones.
    A good's volumes are added. Also the item's
    dimentions are sorted as well as the goods
    are sorted by their volume.

    Parameters
    ----------
    order : dict
        Prepared order dictionary

    Returns
    -------
    features: np.array
        An array of features in right order
        ready for the classifiers to predict.
    """
    query = order.copy()
    goods = []
    for item in query['items']:
        item['sku_vol'] = round(item['a'] * item['b'] * item['c'], 2)
        goods += [item] * item['count']

    features, all_dims = [], []
    total_vol, total_wght = 0, 0
    for item in sorted(goods, key=lambda x: x['sku_vol']):
        features.append(item['goods_wght'])
        total_wght += item['goods_wght']
        dims = sorted([item['a'], item['b'], item['c']],
                      reverse=True)
        features += dims
        all_dims += dims
        features.append(item['sku_vol'])
        total_vol += item['sku_vol']
    features += [total_vol, total_wght, min(all_dims), max(all_dims)]

    return np.array(features, dtype='float16')


def get_cheapest(s: set) -> str:
    """Get a cheapest pack from multiple packs
    Based on the packs prices.
    Also used when the sequence is empty,
    returns 'NONPACK' then.

    Parameters
    ----------
    s : set
        Can be any iterable sequence of packages

    Returns
    -------
    pack: str
        The cheapest package in a sequence

    """
    if not s:
        return 'NONPACK'

    with open(
            f'{os.getcwd()}/models/prices_dict.pkl',
            'rb') as handler:
        prices = pickle.load(handler)

    return sorted(s, key=lambda x: prices.get(x, 1e10))[0]
