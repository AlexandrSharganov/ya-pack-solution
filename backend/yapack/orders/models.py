from django.core.validators import (
    MinLengthValidator, MaxValueValidator, MinValueValidator)
from django.db import models

from users.models import Packer


class Cargotype(models.Model):
    '''Модель карготипа.'''

    cargotype_id = models.IntegerField(
        verbose_name='id карготипа',
        unique=True,
        db_index=True,
        blank=False,
    )
    description = models.CharField(
        verbose_name='Описание карготипа',
        max_length=200,
        blank=False,
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
    )
    dimension_a = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер a',
        blank=False,
    )
    dimension_b = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер b',
        blank=False,
    )
    dimension_c = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер c',
        blank=False,
    )
    sku_wght = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Вес не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Вес не может быть больше 10000'),
        ],
        verbose_name='Вес',
        blank=False,
    )
    cargotypes = models.ManyToManyField(
        Cargotype,
        verbose_name='Карготипы',
        related_name='sku',
    )
    barcode = models.CharField(
        verbose_name='Штрихкод',
        max_length=13,
        unique=True,
        blank=False,
        validators=[
            MinLengthValidator(
                13, message='Штрихкод не может быть короче 13-ти символов'),
        ]
    )

    class Meta:
        verbose_name = 'SKU'
        verbose_name_plural = 'Номенклатура'
        ordering = ['sku_id']

    def __str__(self):
        return self.sku_id


class OrderReceived(models.Model):
    '''Модель заказа полученного из системы.'''

    NO_REC = 'no_rec'
    IN_WORK = 'in_work'
    READY = 'ready'
    PROBLEM = 'problem'
    STATUS = [
        (NO_REC, 'no_rec'),
        (IN_WORK, 'in_work'),
        (READY, 'ready'),
        (PROBLEM, 'problem'),
    ]

    order_key = models.CharField(
        verbose_name='id заказа',
        max_length=200,
        unique=True,
        db_index=True,
        blank=False,
    )
    skus = models.ManyToManyField(
        Sku,
        # related_name='orderreceived',
        through='OrderReceivedSku',
        verbose_name='SKU в заказе',
    )
    packer = models.ForeignKey(
        Packer,
        related_name='orders',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Упаковщик',
    )
    package_match = models.BooleanField(
        verbose_name='Совпадение предложенной и использованной упаковки',
        default=False,
    )
    status = models.CharField(
        max_length=max(len(status) for status, _ in STATUS),
        choices=STATUS,
        default=NO_REC,
    )
    problem_discription = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='Описание проблемы',
        default='no ploblem'
    )

    class Meta:
        verbose_name = 'Полученный заказ'
        verbose_name_plural = 'Полученные заказы'
        ordering = ['order_key']

    def __str__(self):
        return self.order_key


class Package(models.Model):
    '''Модель упаковки.'''

    packagetype = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
        blank=False,
        verbose_name='Тип упаковки',
    )
    length = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Длина',
        blank=False,
    )
    width = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Ширина',
        blank=False,
    )
    height = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Высота',
        blank=False,
    )
    price = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Цена не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Цена не может быть больше 10000'),
        ],
        verbose_name='Цена',
        blank=False,
    )
    barcode = models.CharField(
        verbose_name='Штрихкод',
        max_length=13,
        unique=True,
        blank=False,
        validators=[
            MinLengthValidator(
                13, message='Штрихкод не может быть короче 13-ти символов'),
        ]
    )

    class Meta:
        verbose_name = 'Упаковка'
        verbose_name_plural = 'Виды упаковок'
        ordering = ['packagetype']

    def __str__(self):
        return self.packagetype


class PackageRecommended(models.Model):
    '''Рекомендованная моделью упаковка.'''

    order = models.ForeignKey(
        OrderReceived,
        related_name='packages',
        on_delete=models.CASCADE,
        db_index=True,
        verbose_name='Заказ',
    )
    package = models.ForeignKey(
        Package,
        related_name='recomended',
        on_delete=models.CASCADE,
        db_index=True,
        verbose_name='Рекомендованная упаковка',
    )
    amount = models.SmallIntegerField(
        blank=False,
        verbose_name='Количество',
    )

    class Meta:
        verbose_name = 'Рекомендованная упаковка'
        verbose_name_plural = 'Рекомендованные упаковки'
        ordering = ['order', 'package']

    def __str__(self):
        return f'{self.order} - {self.package}'


class OrderReceivedSku(models.Model):
    '''Модель перечня SKU в заказе.'''

    order = models.ForeignKey(
        OrderReceived,
        on_delete=models.CASCADE,
        verbose_name='Заказ',
    )
    sku = models.ForeignKey(
        Sku,
        on_delete=models.PROTECT,
        verbose_name='SKU',
    )
    amount = models.SmallIntegerField(
        blank=False,
        verbose_name='Количество',
    )

    class Meta:
        verbose_name = 'SKU в заказе'
        verbose_name_plural = 'SKU в заказе'
        ordering = ['order']

    def __str__(self):
        return f'{self.order} - {self.sku}'


class PackageSelected(models.Model):
    '''Выбранная упаковка.'''
    order = models.ForeignKey(
        OrderReceived,
        related_name='packages_sel',
        on_delete=models.CASCADE,
        verbose_name='Заказ',
    )
    package = models.ForeignKey(
        Package,
        on_delete=models.CASCADE,
        db_index=True,
        verbose_name='Выбранная упаковка',
    )
    amount = models.SmallIntegerField(
        blank=False,
        verbose_name='Количество',
    )

    class Meta:
        verbose_name = 'Выбранная упаковка'
        verbose_name_plural = 'Выбранные упаковки'
        ordering = ['order', 'package']

    def __str__(self):
        return f'{self.order} - {self.package}'
