from django.core.validators import FileExtensionValidator
from django.db import models


class Setting(models.Model):
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    email = models.EmailField(verbose_name="Email")
    legal_entity = models.CharField(verbose_name="Юридическое лицо", max_length=255)
    inn = models.CharField(max_length=25, verbose_name="Инн")
    ogrn = models.CharField(max_length=25, verbose_name="Огрн")
    privacy_policy = models.FileField(
        "Политика конфидициальности",
        upload_to="files/",
        validators=[FileExtensionValidator(["pdf"])],
        help_text="Можно загрузить файлы: pdf",
    )
    data_processing = models.FileField(
        "Обработка данных",
        upload_to="files/",
        validators=[FileExtensionValidator(["pdf"])],
        help_text="Можно загрузить файлы: pdf",
    )
    projects = models.ManyToManyField(
        "project.Project",
        blank=True,
        null=True,
        verbose_name="Проекты",
    )

    class Meta:
        verbose_name = "Настройки"
        verbose_name_plural = "Настройки"

    def __str__(self):
        return self.phone
