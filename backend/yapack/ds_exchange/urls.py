from django.urls import path
from .views import get_orders_num_view

app_name = 'ds_exchange'

urlpatterns = [
    path('get_orders/', get_orders_num_view, name='get_orders'),
]
