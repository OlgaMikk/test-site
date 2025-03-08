from datetime import timedelta

from celery import shared_task
from django.utils import timezone

from project.room.models import Room


@shared_task
def clear_room_blocked_at():
    not_sold_rooms = timezone.now() - timedelta(hours=24)
    Room.objects.filter(is_sold=False, blocked_at__lte=not_sold_rooms).delete()
