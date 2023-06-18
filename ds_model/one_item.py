import pickle
import os
import pandas as pd
import numpy as np
from utils import get_cheapest
from packer import get_packed

cb_features = ['goods_wght', 'sku_volume', 'min_sku_dim',
               'max_sku_dim', 'density', 'a', 'b', 'c',
               '200', '290', '291', '292', '320', '340',
               '360', '700', '799']

knn_features = ['goods_wght', 'a', 'b', 'c', 'sku_volume',
                'min_sku_dim', 'max_sku_dim', 'density']

boxes = ['YMA', 'YMC', 'YME', 'YMF', 'YMG', 'YMH', 'YMJ',
         'YML', 'YMN', 'YMO', 'YMP', 'YMQ', 'YMR',  'YMS',
         'YMU', 'YMV', 'YMW',  'YMХ', 'YMX', 'YMY']

packages = ['MYF', 'MYA', 'MYB', 'MYC', 'MYD', 'MYE']


def cook_features_one(query: dict, dataframe: bool = True) -> pd.DataFrame:
    """Prepares the features for models.
    It's different from the one that cook
    features for 2-3 goods since the features are different

    Parameters
    ----------
    query : dict
        Income order dictionary

    dataframe : bool
         (Default value = True)
         Return a pandas DataFrame(for a catboost
         classifier and KNN) or a dictionary(for a
         packer module)

    Returns
    -------
    item : pd.DataFrame or dict
        Prepared features for the item


    """
    with open(
            f'{os.getcwd()}/ds_model/models/cargotypes_dict.pkl',
            'rb') as handler:
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


def get_knn_top(sample: np.array,
                k: int = 3,
                th: float = 0.2) -> list:
    """Gets features of sku and returns top k appropriate packs.
    Based on a pretrained KNNClassifier.
    Scale the features using StandardScaler.

    Parameters
    ----------
    sample : np.array

    k : int
         (Default value = 3)
         Number of most relevant neighbours

    th : float
         (Default value = 0.2)
         A threshold used to cut of the values
         with the score less than threshold

    Returns
    -------
    top : list
        List of recommended packs

    """
    with open(
            f'{os.getcwd()}/ds_model/models/knn_scaler_dict.pkl',
            'rb') as handler:
        knn_clf, std_scaler, pack_dict_inv = pickle.load(handler)

    sample_for_knn = std_scaler.transform(sample.values)
    preds_knn_probas = knn_clf.predict_proba(sample_for_knn)[0]
    probs_packs = [(p, pack_dict_inv[cl]) for p, cl
                   in zip(preds_knn_probas, knn_clf.classes_)]

    knn_recommendations = sorted(probs_packs, reverse=True)
    top = [pack[1] for pack in knn_recommendations if pack[0] >= th]

    return top[:k]


def predict_one_item(query: dict,
                     n_goods: int = 1) -> str:
    """Recommends the carton type for sku.
    Using the combination of filtering by cargotypes,
    binary classification in order to predict if packaging
    is needed for the particular good, searching the
    nearest neighbours using historical data, post filtering
    by skus to classify the type of package and finally
    algo filtering by using packer module to get all packages
    suitable for the item.

    Parameters
    ----------
    query : dict
        Income order dictionary

    n_goods : int
         (Default value = 1)

    Returns
    -------
    package : str
        Recommended package for the good

    """
    item_cargotypes = query['items'][0]['cargotypes']
    if (
        '340' in item_cargotypes or
        '292' in item_cargotypes
    ):
        return 'NONPACK'
    if '360' in item_cargotypes:
        return "STRETCH"
    pack_need = False

    if set(item_cargotypes) & {'950', '700', '460', '310', '960', '60'}:
        pack_need = True
    sample = cook_features_one(query)

    if not pack_need:
        with open(
                f'{os.getcwd()}/ds_model/models/catboost_pack_nonpack.pkl',
                'rb') as handler:
            cb = pickle.load(handler)
        pack_need_cb = cb.predict(sample[cb_features])
        if not pack_need_cb:
            return 'NONPACK'

    knn_ans = get_knn_top(sample[knn_features])
    item = cook_features_one(query, dataframe=False)

    algo_ans = get_packed(query)[0][:3]
    knn_algo_union = set(algo_ans) | set(knn_ans)
    if len(knn_algo_union) == 1:
        return list(knn_algo_union)[0]

    pack_type = None
    if set(item_cargotypes) & {'310'}:
        pack_type = boxes
    if set(item_cargotypes) & {'950', '460'}:
        pack_type = packages

    if pack_type:
        ans = get_cheapest(set([pack for pack in knn_algo_union
                                if pack in pack_type]))
        if ans:
            return ans
        ans = get_cheapest(set([pack for pack in get_packed(item)
                                if pack in pack_type]))
        return ans

    return get_cheapest(knn_algo_union)
