from rest_framework import serializers

from orders.models import Cargotype, OrderReceived, OrderReceivedSku


class CargotypeSerializer(serializers.ModelSerializer):
    '''Сериализатор карготипов.'''
    class Meta:
        model = Cargotype
        fields = (
            'cargotype_id',
        )


class OrderReceivedSkuSerializer(serializers.ModelSerializer):
    '''Сериализатор SKU в заказе.'''
    sku_id = serializers.CharField(source='sku.sku_id')
    dimension_a = serializers.FloatField(source='sku.dimension_a')
    dimension_b = serializers.FloatField(source='sku.dimension_b')
    dimension_c = serializers.FloatField(source='sku.dimension_c')
    sku_wght = serializers.FloatField(source='sku.sku_wght')
    cargotypes = CargotypeSerializer(source='sku.cargotypes', many=True)

    class Meta:
        model = OrderReceivedSku
        fields = (
            'sku_id',
            'dimension_a',
            'dimension_b',
            'dimension_c',
            'sku_wght',
            'amount',
            'cargotypes',
        )


class OrderReceivedSerializer(serializers.ModelSerializer):
    '''Сериализатор полученного заказа.'''
    skus = OrderReceivedSkuSerializer(
        many=True,
        source='orderreceivedsku_set',
        read_only=True
    )

    class Meta:
        model = OrderReceived
        fields = (
            'id',
            'order_key',
            'skus',
            'status',
        )
