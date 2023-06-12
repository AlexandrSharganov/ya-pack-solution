from rest_framework import mixins, status, viewsets

from orders.models import Carton, Order, Sku

from .serializers import (
    CartonSerializer,
    OrderSerializer,
    SkuSerializer
)


class CartonViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = Carton.objects.all()
    serializer_class = CartonSerializer
    

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class SkuViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = Sku.objects.all()
    serializer_class = SkuSerializer
    
    