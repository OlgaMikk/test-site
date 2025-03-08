import os
from datetime import timedelta

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_app.settings")

app = Celery("django_app")

app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.task_default_queue = "base"

app.autodiscover_tasks()

app.conf.beat_schedule = {
    "clear_confirm_reservation": {
        "task": "callback.tasks.clear_confirm_reservation",
        "schedule": crontab(minute="*/5"),
    },
    "clear_room_blocked_at": {
        "task": "project.tasks.clear_room_blocked_at",
        "schedule": timedelta(hours=1),
    },
}
