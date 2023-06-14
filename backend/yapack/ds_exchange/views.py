import requests
from django.http import HttpResponse
from django.shortcuts import render

from .forms import OrdersNumForm


def get_package(orders_num: int):
    pass


def get_orders_num_view(request):
    '''Получаем упаковку из модели DS для нужного количества заказов.'''
    form = OrdersNumForm
    if request.method == 'POST':
        form = form(request.POST)
        if form.is_valid():
            orders_num = form.cleaned_data['orders_num']
            package = get_package(orders_num)
            return HttpResponse(f'Количество {orders_num}')
    return render(request, 'get_orders.html', {'form': form})
