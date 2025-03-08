from django.db import models


class CompanyHistoryBlock(models.Model):
    company_history = models.ForeignKey(
        "CompanyHistory",
        on_delete=models.CASCADE,
        verbose_name="История компании",
        related_name="blocks",
    )
    title = models.CharField("Заголовок", max_length=150)
    description = models.TextField("Описание")
    image = models.ImageField("Изображение", upload_to="history_images/")
    order = models.PositiveIntegerField(
        "Порядок",
        default=0,
        blank=False,
        null=False,
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = [
            "order",
        ]
        verbose_name = "Блок истории компании"
        verbose_name_plural = "Блоки историй компании"


class CompanyHistory(models.Model):
    year = models.IntegerField("Год", primary_key=True)
    title = models.CharField("Заголовок", max_length=150)
    subtitle = models.TextField("Подзаголовок", blank=True)

    blocks: [CompanyHistoryBlock, models.Manager]

    def __str__(self):
        return self.title

    class Meta:
        ordering = ("-year",)
        verbose_name = "История компании"
        verbose_name_plural = "Истории компании"
