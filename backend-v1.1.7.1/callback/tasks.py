from datetime import timedelta

from celery import shared_task
from django.utils import timezone

from callback.reservation.models import ConfirmReservation


@shared_task
def clear_confirm_reservation():
    five_minutes_later = timezone.now() - timedelta(minutes=15)
    ConfirmReservation.objects.filter(created_at__lte=five_minutes_later).delete()
