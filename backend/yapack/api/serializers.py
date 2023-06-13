from django.shortcuts import get_object_or_404
from rest_framework import serializers

from orders.models import (
    Package,
    PackageRecommended,
    OrderReceived,
    Sku,
    Cargotype,
    OrderReceivedSku,
)
from users.models import Packer



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


class PackerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Packer
        fields = ('packer_num',)


class OrderReceivedSerializer(serializers.ModelSerializer):

    skus = OrderReceivedSkuSerializer(
        many=True,
        source='orderreceivedsku_set',  
        read_only=True
    )
    packages = PackageRecommendedSerializer(many=True)
    class Meta:
        model = OrderReceived
        fields = (
            'id',
            'order_key',
            'skus',
            'packages',
            'packer',
            'package_match',
            'status',
        )

    def update(self, instance, validated_data):
        instance.package_match = validated_data.get('package_match', instance.package_match)
        instance.status = validated_data.get('status', instance.status)
        if validated_data.get('packages', None):
            packages = validated_data['packages']
            packages_in_order = [
                PackageRecommended(
                    package=get_object_or_404(
                        Package,
                        packagetype=package['package']['packagetype']
                    ),
                    order=instance,
                    amount=package['amount']
                )
                for package in packages
            ]
            PackageRecommended.objects.filter(order=instance).delete()
            PackageRecommended.objects.bulk_create(packages_in_order)
            instance.save()
            return instance
        instance.save()
        return instance
