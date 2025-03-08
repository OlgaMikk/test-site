from django.core.exceptions import ValidationError
from django.db import models


class Employee(models.Model):
    class TypeEmployee(models.TextChoices):
        ordinary = "ordinary", "Рядовой сотрудник"
        supervisor = "supervisor", "Руководитель"

    type = models.CharField(
        "Тип",
        max_length=45,
        choices=TypeEmployee.choices,
        default=TypeEmployee.ordinary,
    )
    full_name = models.CharField("ФИО", max_length=100)
    position = models.CharField("Должность", max_length=100)
    photo = models.ImageField("Фото", upload_to="employee_photos/")
    quote = models.TextField("Цитата", blank=True)
    phone = models.CharField("Телефон", max_length=20, blank=True, default="")
    email = models.EmailField("Email", blank=True)
    order = models.PositiveIntegerField(
        "Порядок",
        default=0,
        blank=False,
        null=False,
    )

    def check_max_employees(self):
        if self.pk:
            return
        employee_count = Employee.objects.count()
        if employee_count > 19:
            raise ValidationError(f"Невозможно создать больше 20 объектов {self._meta.verbose_name}.")

    def check_one_supervisor(self):
        if self.type != Employee.TypeEmployee.supervisor:
            return
        supervisor = Employee.objects.filter(type=Employee.TypeEmployee.supervisor).first()
        if supervisor and supervisor.pk != self.pk:
            raise ValidationError("Невозможно создать больше руководителей.")

    def clean(self):
        self.check_max_employees()
        self.check_one_supervisor()

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name

    class Meta:
        ordering = [
            "order",
        ]
        verbose_name = "Сотрудник"
        verbose_name_plural = "Сотрудники"
