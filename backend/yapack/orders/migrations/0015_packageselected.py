# Generated by Django 3.2 on 2023-06-13 22:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0014_alter_orderreceivedsku_sku'),
    ]

    operations = [
        migrations.CreateModel(
            name='PackageSelected',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.SmallIntegerField(verbose_name='Количество')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.orderreceived', verbose_name='Заказ')),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='packages_sel', to='orders.package', verbose_name='Выбранная упаковка')),
            ],
        ),
    ]
