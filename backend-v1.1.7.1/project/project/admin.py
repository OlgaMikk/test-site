from adminsortable2.admin import SortableAdminMixin
from django.contrib import admin
from nested_admin.nested import NestedModelAdmin

from ..room.inline import RoomInline
from .forms import ProjectForm
from .inline import (
    BuildingProgressImageInLine,
    BuildingProgressNestedTabularInLine,
    EstateObjectNestedTabularInline,
    GeotagNestedTabularInLine,
    ImageNestedTabularInline,
    ModelInstanceSeoNestedStackedInline,
    RouteInLine,
    TextBlockNestedTabularInLine,
)
from .models import (
    Advantage,
    BuildingProgress,
    BuildingProgressImage,
    City,
    EstateObject,
    Icon,
    Image,
    Location,
    Project,
    Route,
    TextBlock,
)


@admin.register(Icon)
class IconsAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)
    readonly_fields = ("svg_text",)


@admin.register(Advantage)
class AdvantageAdmin(admin.ModelAdmin):
    list_display = ("title",)


@admin.register(EstateObject)
class EstateObjectAdmin(NestedModelAdmin):
    inlines = (RoomInline,)
    autocomplete_fields = ("project",)
    search_fields = ("title",)
    list_display = (
        "title",
        "project",
        "corps",
    )


@admin.register(Image)
class ImageAdmin(SortableAdminMixin, admin.ModelAdmin):
    autocomplete_fields = ("project",)


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


@admin.register(Location)
class LocationAdmin(NestedModelAdmin):
    inlines = (RouteInLine,)
    list_display = ("title",)
    search_fields = ("title",)


@admin.register(Route)
class RouteAdmin(SortableAdminMixin, NestedModelAdmin):
    list_display = (
        "destination",
        "travel_time",
    )
    sortable_field_name = "order"
    autocomplete_fields = ("location",)


@admin.register(TextBlock)
class TextBlockAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("title",)


@admin.register(BuildingProgressImage)
class BuildingProgressImageAdmin(SortableAdminMixin, admin.ModelAdmin):
    autocomplete_fields = ("building_progress",)


@admin.register(BuildingProgress)
class BuildingProgressAdmin(SortableAdminMixin, NestedModelAdmin):
    inlines = (BuildingProgressImageInLine,)
    search_fields = (
        "year",
        "month",
    )


@admin.register(Project)
class ProjectAdmin(NestedModelAdmin):
    inlines = [
        EstateObjectNestedTabularInline,
        ImageNestedTabularInline,
        TextBlockNestedTabularInLine,
        GeotagNestedTabularInLine,
        BuildingProgressNestedTabularInLine,
        ModelInstanceSeoNestedStackedInline,
    ]
    form = ProjectForm
    list_display = (
        "title",
        "city",
        "short_description",
        "address",
        "longitude",
        "latitude",
        "is_published",
        "type",
    )
    list_filter = ("is_published", "type")
    filter_horizontal = (
        "advantages",
        "featured_advantages",
    )
    autocomplete_fields = ("city", "location")
    search_fields = ("title",)
