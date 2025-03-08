from django.contrib import admin

from .models import Layout, Room


@admin.register(Layout)
class LayoutAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "square",
        "room",
    )
    search_fields = ("title",)


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = (
        "estate_object",
        "flat",
        "floor",
        "layout",
        "price",
        "is_sold",
        "blocked_at",
    )
    autocomplete_fields = ("layout", "estate_object")
    list_filter = (
        "is_sold",
        "blocked_at",
    )
