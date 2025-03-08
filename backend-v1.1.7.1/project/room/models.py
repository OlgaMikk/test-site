from typing import Union

from django.db import models


class Layout(models.Model):
    title = models.CharField("Название", max_length=125)
    square = models.DecimalField(default=0, max_digits=8, decimal_places=2, verbose_name="Площадь")
    room = models.IntegerField(
        default=0,
        verbose_name="Количество комнат",
        help_text='"Студия" - это поле со значением 0',
    )
    image = models.ImageField("Изображение", upload_to="layouts/")

    rooms: Union["Room", models.Manager]

    class Meta:
        verbose_name = "Планировка"
        verbose_name_plural = "Планировки"

    def __str__(self):
        return self.title


class Room(models.Model):
    estate_object = models.ForeignKey(
        "EstateObject",
        on_delete=models.CASCADE,
        verbose_name="Объект недвижимости",
        related_name="rooms",
    )
    flat = models.SmallIntegerField(default=0, verbose_name="Квартира")
    floor = models.SmallIntegerField(default=0, verbose_name="Этаж")
    layout = models.ForeignKey(
        Layout,
        on_delete=models.CASCADE,
        verbose_name="Планировка",
        related_name="rooms",
    )
    price = models.DecimalField(default=0, max_digits=15, decimal_places=2, verbose_name="Цена")
    is_sold = models.BooleanField(verbose_name="Продана", default=False)
    blocked_at = models.DateTimeField(verbose_name="Заблокировано", default=None, blank=True, null=True)

    class Meta:
        verbose_name = "Комната"
        verbose_name_plural = "Комнаты"

    def __str__(self):
        return f"{self.estate_object.title} - {self.flat} - {self.floor}"
