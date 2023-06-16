import json
import os
from utils import get_cheapest


def helper(dt: dict,
           sorted_abc: list,
           total_volume: float) -> list:
    """Select packs that fits for the goods"""

    rec_pack = []
    for pack in dt:
        if ((dt[pack]['borders'][0][0] <= sorted_abc[0] <= dt[pack]['borders'][0][1])
                and (dt[pack]['borders'][1][0] <= sorted_abc[1] <= dt[pack]['borders'][1][1])
                and (dt[pack]['borders'][2][0] <= sorted_abc[2] <= dt[pack]['borders'][2][1])
                and (dt[pack]['vol_borders'][0] <= total_volume <= dt[pack]['vol_borders'][1])):
            rec_pack.append(pack)
    return rec_pack


def packer(items: list,
           dt:dict) -> list:
    """функция упаковщика"""

    # здесь все по старому
    sorted_abc_temp = []

    # считаю общие размерности
    for sku in range(len(items)):
        sorted_abc_temp.append(sorted([items[sku]['a'],
                                       items[sku]['b'],
                                       items[sku]['c']]))
        # sorted_abc_temp[sku][0] *= items[sku]['count']#  вот это больше не нужно тк количество все время == 1

    # если не пустой результат – сортирую
    sorted_abc = [] if not sorted_abc_temp else sorted(sorted_abc_temp[0])

    # складываю друг к другу
    for i in range(1, len(sorted_abc_temp)):
        sorted_abc[0] += sorted(sorted_abc_temp[i])[0]
        sorted_abc[1] = max(sorted_abc_temp[i][1], sorted_abc[1])
        sorted_abc[2] = max(sorted_abc_temp[i][2], sorted_abc[2])

    # опять же если не пустой – считаю объем и возвращаю результат найденных упаковок
    if sorted_abc:
        total_volume = sorted_abc[0] * sorted_abc[1] * sorted_abc[2]
        return helper(dt, sorted_abc, total_volume)[:]

    # если считать было нечего – возвращаю пустоту
    return []


def splitter(base: list,
             data: dict) -> tuple:
    """функция разбивает на тех, кому есть упаковка, и кто не влез"""

    # список для тех кто не влез
    add_pack = []
    dt = data[4] if len(base) > 4 else data[len(base)]
    # получаем список подходящих упаковок для данных
    result = packer(base[:], dt)

    # если упаковок не нашлось и еще осталось что перекладывать – начинаем перекладывать
    while (not result) and base:
        # кладем в список тех что не влезают
        add_pack.append(base.pop())
        dt = data[4] if len(base) > 4 else data[len(base)]
        # и снова пытаемся найти упаковку оставшимся
        result = packer(base[:], dt)

    # возвращаем полученную упаковку и список тех которые не влезли
    return result[:], add_pack[:]


def get_packed(jsn: dict) -> tuple:
    """функция основная, делает всю работу"""

    # финальный список упаковок
    final = []
    # вот тут json считываю один раз, но обращаться к нему будем по-разному
    data = json.load(open(f'{os.getcwd()}/ds_model/models/'
                          f'borders_data.json', 'r'))['data']


    # получаем список тех, что влезают в одну упаковку
    # и тех, что не влезли
    items = get_items_list(jsn)
    result, adds = splitter(items[:], data)

    # если в списке есть те, что влезают, добавляем
    if result:
        final.append(result)

    # пока они присутствуют, пытаемся найти упаковки и для тех что не влезли
    while adds:
        # теперь новым списком упаковок становятся те, что не влезли в предыдущую
        # с ними проделываем ту же историю
        result, adds = splitter(adds[:], data)
        # если для них нашлась упаковка, добавляем
        if result:
            final.append(result)

    return tuple(final)


def get_items_list(jsn: dict) -> list:
    """Переделываю список товаров в список их же с количеством 1 чтобы выкидывать по одному
    и дальше работаем только с ним"""
    items = []
    for item in jsn['items'][:]:
        item = item.copy()
        item['count'], count = 1, item['count']
        items += [item] * count
    return items


def form_output(jsn: dict) -> list:

    result = [get_cheapest(packs) for packs in
              get_packed(jsn.copy())]
    packs = {pack: result.count(pack) for pack in set(result)}

    return [{"package": pack,
            "amount": packs[pack]} for pack in packs]
