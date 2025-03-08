from django.db import models


class Jumbotron(models.Model):
    title = models.CharField("Заголовок", max_length=125)
    subtitle = models.CharField("Подзаголовок", max_length=125)
    description = models.TextField("Описание")
    button_link = models.URLField("Ссылка для кнопки")
    picture = models.ImageField("Изображение", upload_to="jumbotrons/")

    order = models.PositiveIntegerField(
        "Порядок",
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = [
            "order",
        ]
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"

    def __str__(self):
        return self.title
