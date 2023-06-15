# import json
import requests
from django.http import HttpResponse
from django.shortcuts import render

from .forms import OrdersNumForm
from .serializers import OrderReceivedSerializer
from orders.models import (
    OrderReceived, Package, PackageRecommended,)


def get_data_for_ds(order: OrderReceived) -> dict:
    serializer = OrderReceivedSerializer(order)
    return serializer.data


def get_package(orders_num: int):
    url_stat = 'http://127.0.0.1:8100/health'
    url_recommend = 'http://127.0.0.1:8100/recommend'
    if requests.get(url_stat).json()['status'] != 'ok':
        return 'Нет ответа!'
    orders = list()
    for _ in range(orders_num):
        order = OrderReceived.objects.filter(status='no_rec').first()
        if order:
            request = get_data_for_ds(order)
            for sku in request['skus']:
                sku['cargotypes'] = [
                    ctype['cargotype_id'] for ctype in sku['cargotypes']]
            response = requests.post(url_recommend, json=request)  # .json()
            response = response.json()
        else:
            return 'Заказы закончились.'
        order = OrderReceived.objects.get_or_create(
            order_key=response['order_key'])[0]
        for package_recomend in response['package']:
            package = Package.objects.get(
                packagetype=package_recomend['package'])
            PackageRecommended.objects.get_or_create(
                order=order,
                package=package,
                amount=package_recomend['amount']
            )
        order.status = order.IN_WORK
        order.save()
        orders.append(order.order_key)
    return orders


def get_orders_num_view(request):
    '''Получаем упаковку из модели DS для нужного количества заказов.'''
    form = OrdersNumForm
    if request.method == 'POST':
        form = form(request.POST)
        if form.is_valid():
            orders_num = form.cleaned_data['orders_num']
            package = get_package(int(orders_num))
            return HttpResponse(
                f'Количество {orders_num}\n'
                f'Ответ {package}'
            )
    return render(request, 'get_orders.html', {'form': form})
