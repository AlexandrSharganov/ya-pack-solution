import csv

from django.core.management.base import BaseCommand
from orders.models import Cargotype, Sku


class Command(BaseCommand):
    '''Заполнение связей sku и карготипов из csv.'''
    help = (
        'Наполняет модель. '
        'Файлы должны находиться в каталоге запуска.'
    )

    def handle(self, *args, **options):
        with open('sku_cargo.csv', encoding='utf-8') as file:
            rows = csv.DictReader(file)
            for row in rows:
                sku = Sku.objects.get(sku_id=row['sku_id'])
                cargotype = Cargotype.objects.get_or_create(
                    cargotype_id=row['cargotype_id'])[0]
                sku.cargotypes.add(cargotype)
                print(sku.cargotypes.all())
