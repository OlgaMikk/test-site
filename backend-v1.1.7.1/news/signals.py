from django.db.models.signals import pre_save
from django.dispatch import receiver

from news.models import News
from project.project.signals import __slug_create


@receiver(pre_save, sender=News)
def set_slug_news(sender, instance, **kwargs):
    __slug_create(instance, News)
