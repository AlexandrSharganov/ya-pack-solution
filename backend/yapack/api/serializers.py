from rest_framework import serializers

from orders.models import (
    Carton,
    SkuInOrderAmount,
    Order,
    Sku,
    Cargotype
)



class CargotypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cargotype
        fields = (
            'cargotype_id',
            'description',
        )


class SkuSerializer(serializers.ModelSerializer):
    
    cargotypes = CargotypeSerializer(many=True)
    
    class Meta:
        model = Sku
        fields = (
            'sku_number',
            'dimension_a',
            'dimension_b',
            'dimension_c',
            'cargotypes',
        )


class SkuAmountSerializer(serializers.ModelSerializer):
    
    dimension_a = serializers.FloatField(source='sku.dimension_a')
    dimension_b = serializers.FloatField(source='sku.dimension_b')
    dimension_c = serializers.FloatField(source='sku.dimension_c')
    class Meta:
        model = SkuInOrderAmount
        fields = (
            'sku',
            'amount',
            'dimension_a',
            'dimension_b',
            'dimension_c',
        )


class OrderSerializer(serializers.ModelSerializer):
    
    sku_list = SkuAmountSerializer(
        many=True,
        source='skuinorderamount_set'
    )
    
    class Meta:
        model = Order
        fields = ('order_key', 'sku_list')


class CartonSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Carton
        fields = '__all__'

