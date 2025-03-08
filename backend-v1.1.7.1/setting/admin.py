from django.contrib import admin
from django_celery_beat.models import (
    ClockedSchedule,
    CrontabSchedule,
    IntervalSchedule,
    PeriodicTask,
    SolarSchedule,
)

from setting.models import Setting

admin.site.unregister(PeriodicTask)
admin.site.unregister(CrontabSchedule)
admin.site.unregister(ClockedSchedule)
admin.site.unregister(IntervalSchedule)
admin.site.unregister(SolarSchedule)


@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    list_display = ("phone", "email", "legal_entity", "inn", "ogrn")
    filter_horizontal = ("projects",)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
