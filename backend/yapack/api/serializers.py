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

from.utils import add_packages_sel, add_rec_packages


class CargotypeSerializer(serializers.ModelSerializer):
    """Сериализатор карготипов."""
    class Meta:
        model = Cargotype
        fields = (
            'cargotype_id',
        )


class SkuSerializer(serializers.ModelSerializer):
    """Сериализатор SKU."""
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
    """Сериализатор полученных заказов c SKU."""
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


class FrontOrderReceivedSkuSerializer(OrderReceivedSkuSerializer):
    """Сериализатор полученных заказов c SKU для фронта."""
    class Meta:
        model = OrderReceivedSku
        fields = (
            'sku_id',
            'barcode',
            'amount',
            'cargotypes',
        )


class PackageSerializer(serializers.ModelSerializer):
    """Сериализатор упаковки."""
    class Meta:
        model = Package
        fields = ('barcode', 'packagetype')


class PackageRecommendedSerializer(serializers.ModelSerializer):
    """Сериализатор рекомендованной упаковки."""
    package = serializers.CharField(source='package.packagetype')
    barcode = serializers.CharField(source='package.barcode')

    class Meta:
        model = PackageRecommended
        fields = (
            'package',
            'amount',
            'barcode'
        )


class PackageSelectedSerializer(PackageRecommendedSerializer):
    """Сериализатор выбранной упаковки."""
    class Meta:
        model = PackageSelected
        fields = (
            'package',
            'amount'
        )


class PackerSerializer(serializers.ModelSerializer):
    """Сериализатор упаковщика."""
    class Meta:
        model = Packer
        fields = ('packer_num',)


class OrderReceivedSerializer(serializers.ModelSerializer):
    """Сериализатор заказов."""
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
        instance.package_match = validated_data.get(
                'package_match', instance.package_match)
        instance.status = validated_data.get('status', instance.status)
        if validated_data.get('packages', None):
            add_rec_packages(validated_data, instance)
            instance.save()
            return instance
        instance.save()
        return instance


class FrontOrderReceivedSerializer(serializers.ModelSerializer):
    """Сериализатор полученных заказов для фронта."""
    skus = FrontOrderReceivedSkuSerializer(
        many=True,
        source='orderreceivedsku_set',
        read_only=True
    )
    packages = PackageRecommendedSerializer(many=True)
    packages_sel = PackageSelectedSerializer(many=True)
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
            'problem_discription'
        )

    def update(self, instance, validated_data):
        instance.package_match = validated_data.get(
                'package_match', instance.package_match)
        instance.status = validated_data.get('status', instance.status)
        instance.problem_discription = validated_data.get(
            'problem_discription',
            instance.problem_discription
        )
        packer = validated_data.get('packer', instance.packer)
        packer_num = packer['packer_num']
        new_packer = get_object_or_404(Packer, packer_num=packer_num)
        if validated_data.get('packages_sel', None):
            add_packages_sel(validated_data, instance)
        instance.packer = new_packer
        instance.save()
        return instance
