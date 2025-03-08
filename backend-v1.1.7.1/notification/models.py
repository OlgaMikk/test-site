from django.contrib.auth.models import User
from django.db import models


class NotificationType(models.Model):
    name = models.CharField("Отображаемое название", max_length=255)
    system_name = models.CharField("Системное название", max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип уведомления"
        verbose_name_plural = "Типы уведомления"


class Email(models.Model):
    user = models.OneToOneField(
        User,
        models.CASCADE,
        verbose_name="Пользователь",
        related_name="email_notification",
    )
    enabled_notifications = models.ManyToManyField(NotificationType, blank=True, verbose_name="Включенные уведомления")
    email = models.EmailField(verbose_name="Email")

    class Meta:
        verbose_name = "Уведомление email"
        verbose_name_plural = "Уведомления emails"
