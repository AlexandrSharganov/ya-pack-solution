import csv

from django.core.management.base import BaseCommand
from orders.models import OrderReceived, OrderReceivedSku, Sku


class Command(BaseCommand):
    """Наполнение модели OrderReceived из csv."""
    help = (
        'Наполняет модель. '
        'Файлы должны находиться в каталоге запуска.'
    )

    def handle(self, *args, **options):
        with open('orders.csv', encoding='utf-8') as file:
            rows = csv.DictReader(file)
            for row in rows:
                order = OrderReceived.objects.get_or_create(
                    order_key=row['order_key'])[0]
                sku = Sku.objects.get(sku_id=row['sku_id'])
                OrderReceivedSku.objects.get_or_create(
                    order=order,
                    sku=sku,
                    amount=row['amount']
                )
