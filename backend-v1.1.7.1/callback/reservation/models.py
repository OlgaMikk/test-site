from django.db import models

from callback.reservation.until import generate_random_code
from project.room.models import Room


class ConfirmReservation(models.Model):
    email = models.EmailField(verbose_name="Email")
    code = models.CharField(max_length=6, verbose_name="Код", default=generate_random_code)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    project = models.ForeignKey("project.Project", on_delete=models.CASCADE, verbose_name="Проект")

    class Meta:
        verbose_name = "Подтверждение бронирования"
        verbose_name_plural = "Подтверждение бронирования"


class Reservation(models.Model):
    full_name = models.CharField(max_length=255, verbose_name="ФИО")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    room = models.ForeignKey(Room, on_delete=models.CASCADE, verbose_name="Комната")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Бронирование"
        verbose_name_plural = "Бронирование"
