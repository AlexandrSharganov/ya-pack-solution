import csv
# import os

from django.core.management.base import BaseCommand
from orders.models import Cargotype, Package
from random import choice


def getbarcode() -> str:
    symbolsincode = 13
    symbols = '0123456789'
    return ''.join([choice(symbols) for _ in range(symbolsincode)])


class Command(BaseCommand):
    '''Наполнение моделей из csv.'''
    help = (
        'Наполняет модель. '
        'Аргументы - имя модели, имя файла csv без расширения. '
        'Файлы должны находиться в каталоге /yapack/.'
    )

    def add_arguments(self, parser):
        parser.add_argument('model', nargs='+', type=str)
        parser.add_argument('file', nargs='+', type=str)

    def handle(self, *args, **options):
        model = options['model'][0]
        file = options['file'][0]
        models = {
            'cargotype': Cargotype,
            'package': Package,
        }
        models_csvfields = {
            'cargotype': {
                'cargotype_id': [int, 'cargotype'],
                'description': [str, 'description'],
            },
            'package': {
                'packagetype': [str, 'CARTONTYPE'],
                'length': [float, 'LENGTH'],
                'width': [float, 'WIDTH'],
                'height': [float, 'HEIGHT'],
                'price': [float, 'PRICE'],
                'barcode': [str, getbarcode()],
            }
        }
        # {os.getcwd()}\\backend\yapack\
        with open(f'{file}.csv', encoding='utf-8') as file:
            rows = csv.DictReader(file)
            for row in rows:
                object_values = dict()
                for key, value in models_csvfields[model].items():
                    if key == 'barcode':
                        object_values[key] = getbarcode()
                    elif row[value[1]] != '':
                        object_values[key] = value[0](row[value[1]])
                    else:
                        object_values[key] = None
                if (
                    not any([val is None for val in object_values.values()])
                ):
                    barcode = object_values.pop('barcode', None)
                    if (
                        not
                        models[model].objects.filter(**object_values).exists()
                    ):
                        if barcode:
                            object_values['barcode'] = barcode
                        models[model].objects.get_or_create(**object_values)
                    print(models[model].objects.get(**object_values))
