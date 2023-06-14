from django.shortcuts import get_object_or_404
from rest_framework import serializers

from orders.models import (
    Package,
    PackageRecommended,
    OrderReceived,
    Sku,
    Cargotype,
    OrderReceivedSku,
    PackageSelected,
)
from users.models import Packer



class CargotypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cargotype
        fields = (
            'cargotype_id',
            # 'description',
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
    barcode = serializers.CharField(source='sku.barcode')
    
    class Meta:
        model = OrderReceivedSku
        fields = (
            'sku_id',
            'barcode',
            'amount',
            'dimension_a',
            'dimension_b',
            'dimension_c',
            'sku_wght',
            'cargotypes',
        )


class FrontOrderReceivedSkuSerializer(serializers.ModelSerializer):
    
    sku_id = serializers.CharField(source='sku.sku_id')
    cargotypes = CargotypeSerializer(source='sku.cargotypes', many=True)
    barcode = serializers.CharField(source='sku.barcode', read_only=True)
    
    class Meta:
        model = OrderReceivedSku
        fields = (
            'sku_id',
            'barcode',
            'amount',
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
        
        
class PackageSelectedSerializer(serializers.ModelSerializer):
    
    package = serializers.CharField(source='package.packagetype')
    
    class Meta:
        model = PackageSelected
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





class FrontOrderReceivedSerializer(serializers.ModelSerializer):

    skus = FrontOrderReceivedSkuSerializer(
        many=True,
        source='orderreceivedsku_set',  
        read_only=True
    )
    packages = PackageRecommendedSerializer(many=True)
    packages_sel = PackageSelectedSerializer(many=True)
    # packer = serializers.CharField(
    #     allow_blank=True,
    #     source='packer.packer_num'
    # )
    packer = serializers.CharField(
        source='packer.packer_num',
        allow_null=True
    )
    class Meta:
        model = OrderReceived
        fields = (
            'id',
            'order_key',
            'skus',
            'packages',
            'packages_sel',
            'packer',
            'package_match',
            'status',
        )

    def update(self, instance, validated_data):
        instance.package_match = validated_data.get('package_match', instance.package_match)
        instance.status = validated_data.get('status', instance.status)
        packer = validated_data.get('packer', instance.packer)
        packer_num = packer['packer_num']
        new_packer = get_object_or_404(Packer, packer_num=packer_num)
        if validated_data.get('packages_sel', None):
            packages = validated_data['packages_sel']
            packages_in_order = [
                PackageSelected(
                    package=get_object_or_404(
                        Package,
                        packagetype=package['package']['packagetype']
                    ),
                    order=instance,
                    amount=package['amount']
                )
                for package in packages
            ]
            PackageSelected.objects.filter(order=instance).delete()
            PackageSelected.objects.bulk_create(packages_in_order)
        instance.packer = new_packer
        instance.save()
        return instance
