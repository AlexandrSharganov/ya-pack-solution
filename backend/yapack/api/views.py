from django.shortcuts import get_object_or_404, get_list_or_404

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.response import Response

from orders.models import OrderReceived, OrderReceivedSku, Package, Sku

from .serializers import (
    PackageSerializer,
    OrderReceivedSerializer,
    SkuSerializer,
    OrderReceivedSkuSerializer,
    FrontOrderReceivedSerializer,
)


class PackageViewSet(viewsets.ReadOnlyModelViewSet):
    '''Вьюсет упаковки.'''
    queryset = Package.objects.all()
    serializer_class = PackageSerializer


class OrderViewSet(
    viewsets.GenericViewSet,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin
):
    '''Вьюсет заказов.'''
    queryset = OrderReceived.objects.all()
    serializer_class = FrontOrderReceivedSerializer

    def get_serializer_class(self):
        if self.request.data.get('packer', None):
            return FrontOrderReceivedSerializer
        return OrderReceivedSerializer


class SkuViewSet(viewsets.ReadOnlyModelViewSet):
    '''Вьюсет SKU.'''
    queryset = Sku.objects.all()
    serializer_class = SkuSerializer


class SkuAmountViewSet(viewsets.ReadOnlyModelViewSet):
    '''Вьюсет заказа.'''
    queryset = OrderReceivedSku.objects.all()
    serializer_class = OrderReceivedSkuSerializer


@api_view(['GET'])
def ds_order_view(request):
    order = get_list_or_404(OrderReceived, status='no_rec')[0]
    # order = OrderReceived.objects.filter(order_is_packed=False).first()
    serializer = OrderReceivedSerializer(order)
    return Response(serializer.data)


@api_view(['GET'])
def front_order_view(request):
    order = get_list_or_404(OrderReceived, status='in_work')[0]
    serializer = FrontOrderReceivedSerializer(order)
    return Response(serializer.data)


@api_view(['GET'])
def front_package_view(request, barcode: str):
    package = get_object_or_404(Package, barcode=barcode)
    serializer = PackageSerializer(package)
    return Response(serializer.data)
