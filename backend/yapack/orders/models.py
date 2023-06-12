from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from users.models import Packer


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
    
    sku_number = models.CharField(
        verbose_name='id товара',
        max_length=200,
        unique=True,
        # db_index=True,
        help_text='id товара',
        primary_key=True
    )
    dimension_a = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер a',
        blank=True,
        null=True,
        help_text='Размер товара a',
    )
    dimension_b = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер b',
        blank=True,
        null=True,
        help_text='Размер товара b',
    )
    dimension_c = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Размер c',
        blank=True,
        null=True,
        help_text='Размер товара c',
    )
    sku_wght = models.FloatField(
        blank=True,
        null=True,
        validators=[
            MinValueValidator(0.0, message='Вес не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Вес не может быть больше 10000'),
        ],
        verbose_name='Вес',
        help_text='Вес товара',
    )
    cargotypes = models.ManyToManyField(
        Cargotype,
        verbose_name='Карготипы',
        related_name='sku',
        help_text='Карготипы',
        blank=True,
    )

    class Meta:
        verbose_name = 'SKU'
        verbose_name_plural = 'Номенклатура'
        ordering = ['sku_number']

    def __str__(self):
        return self.sku_number


class SkuCargotype(models.Model):
    
    sku = models.ForeignKey(
        Sku,
        on_delete=models.CASCADE,
        verbose_name='ID товара'
    )
    cargotype = models.ForeignKey(
        Cargotype,
        on_delete=models.CASCADE,
        verbose_name='карготип'
    )
    
    class Meta:
        verbose_name = 'SKU'
        verbose_name_plural = 'Карготипы товаров'


class Order(models.Model):
    '''Модель заказа полученного из системы.'''
    
    order_key = models.CharField(
        verbose_name='id заказа',
        max_length=200,
        unique=True,
        db_index=True,
        blank=False,
        help_text='id заказа',
        primary_key=True
    )
    sku_list = models.ManyToManyField(
        Sku,
        through='SkuInOrderAmount',
        verbose_name='SKU',
        blank=True
    )
    packman_id = models.ForeignKey(
        Packer,
        on_delete=models.SET_NULL,
        verbose_name='Упаковщик',
        null=True,
        blank=True,
    )
    recommended_carton  = models.ManyToManyField(
        'Carton',
        through='RecommendedCartonInOrderAmount',
        verbose_name='Рекомендуемая упаковка',
        related_name='recommended_carton',
    )
    selected_carton = models.ManyToManyField(
        'Carton',
        through='SelectedCartonInOrderAmount',
        verbose_name='Использованная упаковка',
        related_name='selected_carton',
    )
    suggested_carton_match = models.BooleanField(
        verbose_name='Совпадение используемой и предложенной упаковки',
        null=True,
    )
    
    
    def __str__(self):
        return self.order_key
    
    
class SkuInOrderAmount(models.Model):
    """Вспомогательная модель Sku и их количества в заказе."""

    sku = models.ForeignKey(
        Sku,
        on_delete=models.CASCADE,
        verbose_name='ID товара'
    )
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        verbose_name='Заказ'
    )
    amount = models.PositiveIntegerField(
        verbose_name='Количество SKU',
        validators=[MinValueValidator(
            1, message='Количество не может быть меньше 1')
        ],
        blank=False,
        help_text='Количество',
    )
    
    
class Carton(models.Model):
    '''Модель упаковки.'''
    
    name = models.CharField(
        verbose_name='Название типа упаковки.',
        max_length=7,
        unique=True,
    )
    length = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Длина',
        blank=False,
        help_text='Длина товара',
    )
    width = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Ширина',
        blank=False,
        help_text='Ширина товара',
    )
    height = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Размер не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Размер не может быть больше 10000'),
        ],
        verbose_name='Высота',
        blank=False,
        help_text='Высота товара',
    )
    price = models.FloatField(
        validators=[
            MinValueValidator(0.0, message='Цена не может быть меньше нуля'),
            MaxValueValidator(10000.0,
                              message='Цена не может быть больше 10000'),
        ],
        verbose_name='Цена',
        blank=False,
        help_text='Цена товара',
        null=True,
    )
    
    def __str__(self):
        return self.name
    
class RecommendedCartonInOrderAmount(models.Model):
    """Вспомогательная модель рекомендованной упаковки
    и ее количества в заказе.
    """

    carton = models.ForeignKey(
        Carton,
        on_delete=models.CASCADE,
        verbose_name='ID товара'
    )
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        verbose_name='Заказ'
    )
    amount = models.PositiveIntegerField(
        verbose_name='Количество рекомендованной упаковки в заказе',
        validators=[MinValueValidator(
            1, message='Количество не может быть меньше 1')
        ],
        blank=False,
        help_text='Количество',
    )


class SelectedCartonInOrderAmount(models.Model):
    """Вспомогательная модель использованной упаковки
    и ее количества в заказе.
    """

    carton = models.ForeignKey(
        Carton,
        on_delete=models.CASCADE,
        verbose_name='ID товара'
    )
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        verbose_name='Заказ'
    )
    amount = models.PositiveIntegerField(
        verbose_name='Количество использованной упаковки в заказе',
        validators=[MinValueValidator(
            1, message='Количество не может быть меньше 1')
        ],
        blank=False,
        help_text='Количество',
    )
    

