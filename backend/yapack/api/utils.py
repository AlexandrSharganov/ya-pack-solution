from django.shortcuts import get_object_or_404

from orders.models import Package, PackageSelected, PackageRecommended

from orders.models import PackageSelected


def add_packages_sel(validated_data, instance):
    """Добавление в заказ выбранных упаковок."""
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


def add_rec_packages(validated_data, instance):
    """Добавление в заказ рекомендуемых упаковок."""
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