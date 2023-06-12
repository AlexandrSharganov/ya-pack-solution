from rest_framework import mixins, status, viewsets

from orders.models import Package, OrderReceived, Sku, OrderReceivedSku

from .serializers import (
    PackageSerializer,
    OrderReceivedSerializer,
    SkuSerializer,
    OrderReceivedSkuSerializer
)


class PackageViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = OrderReceived.objects.all()
    serializer_class = OrderReceivedSerializer


class SkuViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = Sku.objects.all()
    serializer_class = SkuSerializer


class SkuAmountViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = OrderReceivedSku.objects.all()
    serializer_class = OrderReceivedSkuSerializer
    