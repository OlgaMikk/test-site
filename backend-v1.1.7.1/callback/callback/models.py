from django.core.exceptions import ValidationError
from django.db import models


class Callback(models.Model):
    full_name = models.CharField(max_length=255, verbose_name="ФИО")
    phone = models.CharField(max_length=20, verbose_name="Телефон", blank=True, null=False, default="")
    email = models.EmailField(verbose_name="Email", blank=True, null=False, default="")
    city = models.CharField(max_length=75, verbose_name="Город")
    is_processed = models.BooleanField(default=False, verbose_name="Обработано")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if not self.phone and not self.email:
            raise ValidationError(
                {
                    "phone": "Должны быть указаны или phone, или email, или оба.",
                    "email": "Должны быть указаны или phone, или email, или оба.",
                },
            )

    class Meta:
        verbose_name = "Обратная связь"
        verbose_name_plural = "Обратная связь"
