from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from .views import (
    CartonViewSet,
    OrderViewSet,
    SkuViewSet
)

app_name = 'api'

router = DefaultRouter()
router.register('carton', CartonViewSet, basename='carton')
router.register('order', OrderViewSet, basename='order')
router.register('sku', SkuViewSet, basename='sku')

urlpatterns = [
    path('', include(router.urls)),
]