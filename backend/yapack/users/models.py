from django.db import models


class Packer(models.Model):
    '''Модель пользователя - упаковщика.'''
    first_name = models.CharField(
        max_length=150,
        verbose_name='Имя',
        blank=False
    )
    last_name = models.CharField(
        max_length=150,
        verbose_name='Фамилия',
        blank=False
    )
    packer_num = models.CharField(
        max_length=15,
        unique=True,
        verbose_name='Номер упаковщика',
        blank=False
    )

    class Meta:
        verbose_name = "Упаковщик"
        verbose_name_plural = "Упаковщики"
        ordering = ('last_name', 'first_name',)

    def __str__(self):
        return f'{self.last_name} {self.first_name}'
