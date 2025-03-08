from adminsortable2.admin import SortableAdminMixin
from django.contrib import admin

from team.models import Employee


@admin.register(Employee)
class EmployeeAdmin(SortableAdminMixin, admin.ModelAdmin):
    exclude = ("quote",)
    list_display = ("full_name", "position", "type")

    def get_exclude(self, request, obj=None):
        if obj and obj.type == obj.TypeEmployee.supervisor:
            return []
        return super().get_exclude(request, obj)
