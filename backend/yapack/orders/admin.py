from django.contrib import admin

from .models import (
    Sku,
    Order,
    SkuInOrderAmount,
    Cargotype,
    SkuCargotype
)


@admin.register(Cargotype)
class CargotypeAdmin(admin.ModelAdmin):
    
    list_display = (
        'cargotype_id',
        'description'
    )


@admin.register(SkuCargotype)
class SkuCargotypeAdmin(admin.ModelAdmin):
    
    list_display = (
        'sku',
        'cargotype'
    )



class SkuCargotypeInline(admin.TabularInline):
    
    model = SkuCargotype
    extra = 0


@admin.register(Sku)
class SkuAdmin(admin.ModelAdmin):
    
    inlines = (SkuCargotypeInline,)
    
    list_display = (
        'sku_number',
    )
    search_fields = (
        'sku_number',
    )
    

class SkuInOrderAmountInline(admin.TabularInline):
    """Добавление товаров в админку заказов."""

    model = SkuInOrderAmount
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    
    inlines = (SkuInOrderAmountInline,)
    
    list_display = (
        'order_key',
    )