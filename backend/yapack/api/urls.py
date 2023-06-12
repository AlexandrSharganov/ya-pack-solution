from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from .views import (
    PackageViewSet,
    OrderViewSet,
    SkuViewSet,
    SkuAmountViewSet
)

app_name = 'api'

router = DefaultRouter()
router.register('package', PackageViewSet, basename='package')
router.register('order', OrderViewSet, basename='order')
router.register('sku', SkuViewSet, basename='sku')
router.register('skuamount', SkuAmountViewSet, basename='skuamount')


urlpatterns = [
    path('', include(router.urls)),
]