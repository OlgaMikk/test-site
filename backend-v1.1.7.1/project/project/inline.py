from nested_admin.forms import SortableHiddenMixin
from nested_admin.nested import NestedStackedInline, NestedTabularInline
from seo.admin.inline import ModelInstanceSeoInline

from ..room.inline import RoomInline
from .models import (
    BuildingProgress,
    BuildingProgressImage,
    EstateObject,
    Geotag,
    Image,
    Route,
    TextBlock,
)


class EstateObjectNestedTabularInline(NestedTabularInline):
    model = EstateObject
    extra = 0
    inlines = (RoomInline,)


class ImageNestedTabularInline(SortableHiddenMixin, NestedTabularInline):
    model = Image
    sortable_field_name = "order"
    max_num = 15
    extra = 0


class RouteInLine(SortableHiddenMixin, NestedTabularInline):
    model = Route
    sortable_field_name = "order"
    max_num = 3
    extra = 0


class TextBlockNestedTabularInLine(SortableHiddenMixin, NestedTabularInline):
    model = TextBlock
    sortable_field_name = "order"
    max_num = 10
    extra = 0


class GeotagNestedTabularInLine(SortableHiddenMixin, NestedTabularInline):
    model = Geotag
    sortable_field_name = "order"
    extra = 0
    autocomplete_fields = ("icon",)


class BuildingProgressImageInLine(SortableHiddenMixin, NestedTabularInline):
    model = BuildingProgressImage
    sortable_field_name = "order"
    extra = 0


class BuildingProgressNestedTabularInLine(SortableHiddenMixin, NestedTabularInline):
    model = BuildingProgress
    sortable_field_name = "order"
    extra = 0
    inlines = [BuildingProgressImageInLine]


class ModelInstanceSeoNestedStackedInline(ModelInstanceSeoInline, NestedStackedInline):
    pass
