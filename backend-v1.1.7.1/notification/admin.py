from django.contrib import admin

from notification.models import Email, NotificationType


@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    list_display = ("user", "email")
    change_list_template = "notification/change_list.html"

    def changelist_view(self, request, extra_context=None):
        extra_context = {
            "notification_types": NotificationType.objects.all(),
        }
        return super().changelist_view(request, extra_context)
