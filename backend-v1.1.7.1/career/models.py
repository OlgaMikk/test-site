from typing import Union

from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models


class Vacancy(models.Model):
    position = models.CharField("Должность", max_length=150)
    salary = models.CharField("Зарплата", max_length=150)
    conditions = models.TextField("Условия")
    requirements = models.TextField("Требования")

    job_responses: Union["JobResponse", models.Manager]

    def __str__(self):
        return self.position

    class Meta:
        ordering = ["position"]
        verbose_name = "Вакансия"
        verbose_name_plural = "Вакансии"


class JobResponse(models.Model):
    full_name = models.CharField("ФИО", max_length=255)
    phone = models.CharField("Телефон", max_length=20)
    email = models.EmailField("Email")
    vacancy = models.ForeignKey(
        Vacancy,
        verbose_name="Вакансия",
        on_delete=models.SET_NULL,
        related_name="job_responses",
        null=True,
        blank=True,
    )
    specialty = models.CharField("Специальность", max_length=255, blank=True)
    resume = models.FileField("Резюме", upload_to="resumes/", validators=[FileExtensionValidator(("pdf",))])
    cover_letter = models.FileField(
        "Сопроводительное письмо",
        upload_to="cover_letters/",
        blank=True,
        validators=[FileExtensionValidator(("pdf",))],
    )

    def clean(self):
        if not self.vacancy and not self.specialty:
            raise ValidationError(
                {
                    "vacancy": "Должны быть указаны или vacancy, или specialty, или оба.",
                    "specialty": "Должны быть указаны или vacancy, или specialty, или оба.",
                },
            )

    @property
    def applied_to(self):
        return self.vacancy.position if self.vacancy else self.specialty

    applied_to.fget.short_description = "Позиция"

    def __str__(self):
        return f"{self.full_name} {self.applied_to}"

    class Meta:
        verbose_name = "Отклик"
        verbose_name_plural = "Отклики"
