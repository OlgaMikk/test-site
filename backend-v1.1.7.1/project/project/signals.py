from django.db.models.signals import pre_save
from django.dispatch import receiver
from pytils.translit import slugify

from project.project.models import City, Project
from utils.unique_slug import get_unique_slug


@receiver(pre_save, sender=City)
def set_slug_city(sender, instance, **kwargs):
    __slug_create(instance, City)


@receiver(pre_save, sender=Project)
def set_slug_city(sender, instance, **kwargs):
    __slug_create(instance, Project)


def __slug_create(instance, model):
    if instance.slug:
        return

    title = instance.title
    slug = slugify(title)
    if model.objects.filter(slug=slug).exists():
        instance.slug = get_unique_slug(instance.id, title, model.objects)
    else:
        instance.slug = slug
