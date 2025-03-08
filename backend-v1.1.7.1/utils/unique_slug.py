from typing import Any

from django.db.models import QuerySet
from pytils.translit import slugify


def get_unique_slug(id_: int, title: str, obj: QuerySet[Any]) -> str:
    slug = slugify(title.replace("ı", "i"))
    unique_slug = slug
    counter = 1
    while obj.filter(slug=unique_slug).exists():
        if obj.filter(slug=unique_slug).values("id")[0]["id"] == id_:
            break
        unique_slug = f"{slug}-{counter}"
        counter += 1
    return unique_slug
