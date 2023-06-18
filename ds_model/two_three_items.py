from utils import cook_features, get_cheapest
from packer import get_packed
import pickle
import os


def ml_two_three(query: dict, n_goods: int, top_k=3) -> list:
    """Get predictions for two or three goods in order
    using a combinations of several catboost classifiers
    pretrained for 2 and 3 (separately) goods in order.
    At the first step the classifier determines which group
    of packs is more appropriate. At the next step(if its the
    most common group) a few separated classifiers return their
    scores related to each package type. Then the top_k packages
    with the highest scores are picked.

    Parameters
    ----------
    query : dict
        Order dictionary

    n_goods : int
        Amount of goods order contains
    top_k :
         (Default value = 3)
         The number of most appropriate packages
         recommended byt the algorythm

    Returns
    -------
    packages : List[str]
        Either the lsit of non common packages,
        or top_k most preffered packages for particular
        order.
    """
    features = cook_features(query)
    file = "two" if n_goods == 2 else "three"
    with open(
            f'{os.getcwd()}/ds_model/models/{file}_goods_models.pkl',
            'rb') as handler:
        tools = pickle.load(handler)

    cb, rest_packs = tools[0][0], tools[0][1]
    if cb.predict(features):
        return rest_packs

    multiclass_result = []
    for model in tools[1]:
        multiclass_result.append((model[0],
                                  model[1].predict_proba(features)[1]))

    result_packs = sorted(multiclass_result,
                          key=lambda x: x[1],
                          reverse=True)[:top_k]
    return [pack[0] for pack in result_packs]


def predict_two_three(query: dict, top_k: int = 3, n_goods: int = 2) -> str:
    """Recommend pack for two-three items
    Combination of ml predictions and algo sort

    Parameters
    ----------
    query : dict
        Order dictionary

    top_k : int
         (Default value = 3)
         Number of packages to take from
         algo selection
    n_goods : int
         (Default value = 2)
         Number of goods order contains

    Returns
    -------
    pack : str
        Recommended package for the order

    """

    ml_preds = ml_two_three(query, n_goods)
    algo_preds = get_packed(query)[0]

    if len(ml_preds) > top_k:
        for pack in algo_preds:
            if pack in ml_preds:
                return pack

    ml_alg = set(ml_preds) & set(algo_preds[:3])

    return get_cheapest(ml_alg)
