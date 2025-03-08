from adminsortable2.admin import SortableAdminMixin
from django.contrib import admin
from nested_admin.nested import NestedModelAdmin

from history.inlines import CompanyHistoryBlockNestedTabularInline
from history.models import CompanyHistory, CompanyHistoryBlock


@admin.register(CompanyHistoryBlock)
class CompanyHistoryBlockAdmin(SortableAdminMixin, admin.ModelAdmin):
    autocomplete_fields = ("company_history",)


@admin.register(CompanyHistory)
class CompanyHistoryAdmin(NestedModelAdmin):
    inlines = (CompanyHistoryBlockNestedTabularInline,)
    list_display = (
        "year",
        "title",
    )
    search_fields = ("title",)
