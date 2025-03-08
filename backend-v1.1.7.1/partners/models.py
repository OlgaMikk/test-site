from django.db import models


class Partner(models.Model):
    title = models.CharField("Наименование", max_length=100)
    description = models.TextField("Описание")
    image = models.ImageField("Изображение", upload_to="partners/")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Партнер"
        verbose_name_plural = "Партнеры"
