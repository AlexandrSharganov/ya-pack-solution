import json
import os
from utils import get_cheapest


def helper(dt: dict,
           sorted_abc: list,
           total_volume: float) -> list:
    """Select packs that fits for the goods.
    Using borders for each pack of the goods have
    been packed in it from historical data.

    Parameters
    ----------
    dt : dict
        A dictionary with borders dimentions of
        goods have been packed in each pack based
        on historical data.

    sorted_abc : list
        Sorted linear dimentions of the goods.

    total_volume : float
        Goods calculated volume.


    Returns
    -------
    rec_pack : list
        List of packages suitable for the goods.

    """

    rec_pack = []
    for pack in dt:
        if (
            (
                dt[pack]['borders'][0][0] <=
                sorted_abc[0] <=
                dt[pack]['borders'][0][1]
            ) and
            (
                dt[pack]['borders'][1][0] <=
                sorted_abc[1] <=
                dt[pack]['borders'][1][1]
            ) and
            (
                dt[pack]['borders'][2][0] <=
                sorted_abc[2] <=
                dt[pack]['borders'][2][1]
            ) and
            (
                dt[pack]['vol_borders'][0] <=
                total_volume <=
                dt[pack]['vol_borders'][1]
            )
        ):
            rec_pack.append(pack)
    return rec_pack


def packer(items: list, dt: dict) -> list:
    """Imitating a packer function.
    Rotating and stacking goods accorging
    to their linear dimentions. Works with
    several goods and uses a halper function.

    Parameters
    ----------
    items : list
        List of goods

    dt : dict
        Borders dictionary to pass to helper

    Returns
    -------
    rec_pack : list
        List of packages suitable for the goods.

    """
    sorted_abc_temp = []

    for sku in range(len(items)):
        sorted_abc_temp.append(sorted([items[sku]['a'],
                                       items[sku]['b'],
                                       items[sku]['c']]))

    sorted_abc = [] if not sorted_abc_temp else sorted(sorted_abc_temp[0])

    for i in range(1, len(sorted_abc_temp)):
        sorted_abc[0] += sorted(sorted_abc_temp[i])[0]
        sorted_abc[1] = max(sorted_abc_temp[i][1], sorted_abc[1])
        sorted_abc[2] = max(sorted_abc_temp[i][2], sorted_abc[2])

    if sorted_abc:
        total_volume = sorted_abc[0] * sorted_abc[1] * sorted_abc[2]
        return helper(dt, sorted_abc, total_volume)[:]

    return []


def splitter(base: list,
             data: dict) -> tuple:
    """Find the package for the goods can fit in
    and separate the rest. The continuously repeat
    the same procedure for the rest untill all groups
    of goods have their package to pack in.

    Parameters
    ----------
    base : list
        List of goods to pack

    data : dict
        A dictionary with all borders based on
        historical data. After each split finds the
        appropriate dict according to the amount
        of goods left

    Returns
    -------
    result : list
        List of packages to pack the group of goods.

    add_pack : list
        List of goods left unpacked so far

    """

    add_pack = []
    dt = data[4] if len(base) > 4 else data[len(base)]
    result = packer(base[:], dt)

    while (not result) and base:
        add_pack.append(base.pop())
        dt = data[4] if len(base) > 4 else data[len(base)]
        result = packer(base[:], dt)

    return result[:], add_pack[:]


def get_packed(jsn: dict) -> tuple:
    """Main packing function

    Parameters
    ----------
    jsn : dict
        Income order dictionary


    Returns
    -------
    final : List[list]
        List of lists of packages for each group of goods
    """

    final = []
    data = json.load(open(f'{os.getcwd()}/models/'
                          f'borders_data.json', 'r'))['data']

    items = get_items_list(jsn)
    result, adds = splitter(items[:], data)

    if result:
        final.append(result)

    while adds:
        result, adds = splitter(adds[:], data)
        if result:
            final.append(result)

    return tuple(final)


def get_items_list(jsn: dict) -> list:
    """Transforms the order list of items
    into a list where each item has amount of 1

    Parameters
    ----------
    jsn : dict
        Income order dictionary

    Returns
    -------
    items : list[dict]
        Transformed list of items
    """
    items = []
    for item in jsn['items'][:]:
        item = item.copy()
        item['count'], count = 1, item['count']
        items += [item] * count
    return items


def form_output(jsn: dict) -> list:
    """Form the correct output for the backend
    Used when no ml services involved

    Parameters
    ----------
    jsn : dict
        Income order dictionary

    Returns
    -------
    package : List[dict]
        List of dictionaries with package code
        and amount for each package

    """

    result = [get_cheapest(packs) for packs in
              get_packed(jsn.copy())]
    packs = {pack: result.count(pack) for pack in set(result)}

    return [{"package": pack,
            "amount": packs[pack]} for pack in packs]
