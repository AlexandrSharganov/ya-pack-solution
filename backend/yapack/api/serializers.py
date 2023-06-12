from rest_framework import serializers

from orders.models import (
    Package,
    PackageRecommended,
    OrderReceived,
    Sku,
    Cargotype,
    OrderReceivedSku,
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
            'sku_id',
            'dimension_a',
            'dimension_b',
            'dimension_c',
            'sku_wght',
            'cargotypes',
        )


class OrderReceivedSkuSerializer(serializers.ModelSerializer):
    
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
            'amount',
            'dimension_a',
            'dimension_b',
            'dimension_c',
            'sku_wght',
            'cargotypes',
        )


class PackageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Package
        fields = '__all__'


class PackageRecommendedSerializer(serializers.ModelSerializer):
    
    package = serializers.CharField(source='package.packagetype')
    
    class Meta:
        model = PackageRecommended
        fields = (
            'package',
            'amount'
        )


class OrderReceivedSerializer(serializers.ModelSerializer):
    
    skus = OrderReceivedSkuSerializer(
        many=True,
        source='orderreceivedsku_set'
    )
    package = PackageRecommendedSerializer(many=True)
    
    class Meta:
        model = OrderReceived
        fields = (
            'order_key',
            'skus',
            'package',
            'packer',
            'package_match',
        )
