import requests
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render

from .forms import OrdersNumForm
from .serializers import OrderReceivedDsSerializer
from orders.models import (
    OrderReceived, Package, PackageRecommended,)


def get_data_for_ds(order: OrderReceived) -> dict:
    '''Формируем данные для json в правильную структуру.'''
    data = OrderReceivedDsSerializer(order).data
    for sku in data['skus']:
        sku['cargotypes'] = [
            ctype['cargotype_id'] for ctype in sku['cargotypes']]
    return data


def filling_models(data):
    '''Заполняем БД исходя из полученных данных.'''
    order = OrderReceived.objects.get_or_create(
                            order_key=data['order_key'])[0]
    for package_recomend in data['package']:
        package = Package.objects.get(
            packagetype=package_recomend['package'])
        PackageRecommended.objects.get_or_create(
            order=order,
            package=package,
            amount=package_recomend['amount']
        )
    order.status = order.IN_WORK
    order.save()
    return order.order_key


def get_package(orders_num: int):
    '''Получаем упаковку из DS-модели.'''
    url_stat = settings.DS_URL['STATUS']
    url_recommend = settings.DS_URL['RECOMEND']
    if requests.get(url_stat).json()['status'] != 'ok':
        return 'Нет ответа!'
    orders = list()
    for _ in range(orders_num):
        order = OrderReceived.objects.filter(status='no_rec').first()
        if order:
            request = get_data_for_ds(order)
            try:
                response = requests.post(
                    url_recommend, json=request, timeout=3).json()
            except requests.exceptions.ReadTimeout:
                orders.append('Упаковка не получена!')
                order.status = order.IN_WORK
                order.save()
                continue
        else:
            orders.append('Заказы закончились.')
            return orders
        orders.append(filling_models(response))
    return orders


def get_orders_num_view(request):
    '''Получаем количество заказов для обработки.'''
    form = OrdersNumForm
    if request.method == 'POST':
        form = form(request.POST)
        if form.is_valid():
            orders_num = form.cleaned_data['orders_num']
            package = get_package(int(orders_num))
            return HttpResponse(
                f'<p>Количество {orders_num}</p>'
                f'<p>Ответ {package}</p>'
            )
    return render(request, 'get_orders.html', {'form': form})
