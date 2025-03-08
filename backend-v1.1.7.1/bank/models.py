from django.core.validators import FileExtensionValidator
from django.db import models


class Bank(models.Model):
    title = models.CharField(max_length=125, verbose_name="Название")
    icon = models.FileField(
        "Иконка",
        upload_to="bank_icons/",
        validators=[FileExtensionValidator(["svg", "png", "jpg", "jpeg"])],
        help_text="Можно загрузить файлы: svg, png, jpg, jpeg",
    )
    url = models.URLField("Ссылка на сайт")

    class Meta:
        verbose_name = "Банк"
        verbose_name_plural = "Банки"

    def __str__(self):
        return self.title
