from django.contrib import admin
from .models import (
    Cargotype, Sku, OrderReceived, Package, PackageRecommended,
    OrderReceivedSku, PackageSelected
)


@admin.register(OrderReceived)
class OrderReceivedAdmin(admin.ModelAdmin):
    list_display = ['order_key', 'status']


@admin.register(PackageRecommended)
class PackageRecommendedAdmin(admin.ModelAdmin):
    list_display = ['order', 'package', 'amount']


@admin.register(OrderReceivedSku)
class OrderReceivedSkuAdmin(admin.ModelAdmin):
    list_display = ['order', 'sku', 'amount']


admin.site.register(
    (Cargotype, Sku, Package, PackageSelected)
)
