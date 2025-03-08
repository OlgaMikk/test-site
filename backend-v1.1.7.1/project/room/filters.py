from django_filters import rest_framework as filters

from project.room.models import Room


class RoomFilter(filters.FilterSet):
    ROOM_CHOICES = (
        ("none", "None"),
        ("not_none", "Not None"),
    )

    flat_range = filters.RangeFilter(field_name="flat", label="Квартира")
    floor_range = filters.RangeFilter(field_name="floor", label="Этаж")
    price_range = filters.RangeFilter(field_name="price", label="Цена")
    square_range = filters.RangeFilter(field_name="layout__square", label="Площадь")
    corps_ids = filters.CharFilter(method="filter_corps", label="Корпус")
    room_ids = filters.CharFilter(method="filter_room", label="Комнаты")

    def filter_corps(self, queryset, name, value):
        corps_list = value.split(",")
        return queryset.filter(estate_object__corps__in=corps_list)

    def filter_room(self, queryset, name, value):
        room_list = value.split(",")
        return queryset.filter(layout__room__in=room_list)

    class Meta:
        model = Room
        fields = (
            "flat_range",
            "floor_range",
            "price_range",
            "square_range",
            "corps_ids",
            "room_ids",
        )
