from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Cargotype(models.Model):
    '''Модель карготипа.'''
    cargotype_id = models.IntegerField(
        verbose_name='id карготипа',
        unique=True,
        db_index=True,
        blank=False,
        help_text='id карготипа',
    )
    description = models.CharField(
        verbose_name='Описание карготипа',
        max_length=200,
        unique=True,
        db_index=True,
        blank=False,
        help_text='Описание',
    )

    class Meta:
        verbose_name = 'Карготип'
        verbose_name_plural = 'Карготипы'
        ordering = ['cargotype_id']

    def __str__(self):
        return self.description[:30]


class Sku(models.Model):
    '''Модель товарной позиции.'''
    sku_id = models.CharField(
        verbose_name='id товара',
        max_length=200,
        unique=True,
        db_index=True,
        blank=False,
        help_text='id товара',
    )
    dimension_a = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер a',
        blank=False,
        help_text='Размер товара a',
    )
    dimension_b = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер b',
        blank=False,
        help_text='Размер товара b',
    )
    dimension_c = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер c',
        blank=False,
        help_text='Размер товара c',
    )
    sku_wght = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Вес не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Вес не может быть больше 10000'),
        ],
        verbose_name='Вес',
        blank=False,
        help_text='Вес товара',
    )
    cargotypes = models.ManyToManyField(
        Cargotype,
        verbose_name='Карготипы',
        related_name='sku',
        help_text='Карготипы',
    )

    class Meta:
        verbose_name = 'SKU'
        verbose_name_plural = 'Номенклатура'
        ordering = ['sku_id']

    def __str__(self):
        return self.sku_id


class order_received(models.Model):
    '''Модель заказа полученного из системы.'''
    orderkey = models.CharField(
        verbose_name='id заказа',
        max_length=200,
        unique=True,
        db_index=True,
        blank=False,
        help_text='id заказа',
    )
    sku = models.ManyToManyField(
        Sku,
        verbose_name='SKU',
        related_name='ordersreceived',
    )
    count = models.PositiveIntegerField(
        verbose_name='Количество SKU',
        validators=[MinValueValidator(
            1, message='Количество не может быть меньше 1')
        ],
        blank=False,
        help_text='Количество',
    )
