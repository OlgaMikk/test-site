from nested_admin.nested import NestedTabularInline

from project.room.models import Room


class RoomInline(NestedTabularInline):
    model = Room
    extra = 0
    autocomplete_fields = ("estate_object", "layout")
