from django.shortcuts import get_object_or_404, get_list_or_404

from rest_framework import mixins, status, viewsets
from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin, ListModelMixin
from rest_framework.decorators import api_view
from rest_framework.response import Response

from orders.models import Package, OrderReceived, Sku, OrderReceivedSku

from .serializers import (
    PackageSerializer,
    OrderReceivedSerializer,
    SkuSerializer,
    OrderReceivedSkuSerializer,
    FrontOrderReceivedSerializer
)


class PackageViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    

class OrderViewSet(viewsets.GenericViewSet, UpdateModelMixin, RetrieveModelMixin, ListModelMixin):
    
    queryset = OrderReceived.objects.all()
    serializer_class = FrontOrderReceivedSerializer
    
    def get_serializer_class(self):
        
        if self.request.data.get('packer', None):
            return FrontOrderReceivedSerializer
        return OrderReceivedSerializer


# class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    
#     queryset = OrderReceived.objects.all()
#     serializer_class = OrderReceivedSerializer


class SkuViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = Sku.objects.all()
    serializer_class = SkuSerializer


class SkuAmountViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset = OrderReceivedSku.objects.all()
    serializer_class = OrderReceivedSkuSerializer


# @api_view(['PATCH'])
# def order_putch(request, id):
#     order= get_object_or_404(OrderReceived, id=id)
#     serializer = OrderReceivedSerializer(order, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


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
