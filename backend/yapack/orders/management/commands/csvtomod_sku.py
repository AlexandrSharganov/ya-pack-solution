import csv

from django.core.management.base import BaseCommand
from orders.models import Sku
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
        'Файлы должны находиться в каталоге запуска.'
    )

    def add_arguments(self, parser):
        parser.add_argument('model', nargs='+', type=str)
        parser.add_argument('file', nargs='+', type=str)

    def handle(self, *args, **options):
        model = options['model'][0]
        file = options["file"][0]
        modelsfieldtypes = {
            'sku': {
                'sku_id': str,
                'dimension_a': float,
                'dimension_b': float,
                'dimension_c': float,
                'sku_wght': float,
                'barcode': getbarcode(),
            }
        }
        with open(f'{file}.csv', encoding='utf-8') as file:
            rows = csv.DictReader(file)
            for row in rows:
                objectvalues = dict()
                for key, fieldtype in modelsfieldtypes[model].items():
                    if key == 'barcode':
                        objectvalues[key] = getbarcode()
                    else:
                        objectvalues[key] = fieldtype(row[key])
                if not Sku.objects.filter(
                        sku_id=objectvalues['sku_id']).exists():
                    Sku.objects.create(**objectvalues)
                    print(Sku.objects.get(**objectvalues))
