from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    PackageViewSet,
    OrderViewSet,
    SkuViewSet,
    SkuAmountViewSet,
    ds_order_view,
    front_order_view,
    front_package_view,
)

app_name = 'api'

router = DefaultRouter()
router.register('package', PackageViewSet, basename='package')
router.register('order', OrderViewSet, basename='order')
router.register('sku', SkuViewSet, basename='sku')
router.register('skuamount', SkuAmountViewSet, basename='skuamount')


urlpatterns = [
    path('order/ds/', ds_order_view, name='ds_order_view'),
    path('order/front/', front_order_view, name='front_order_view'),
    path('order/front/<str:barcode>/', front_package_view,
         name='front_package_view'),
    path('', include(router.urls)),
]
