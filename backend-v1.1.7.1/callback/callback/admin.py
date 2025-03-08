from django.contrib import admin

from callback.models import Callback


@admin.register(Callback)
class CallbackAdmin(admin.ModelAdmin):
    list_filter = ("created_at", "updated_at", "is_processed")
    list_display = ("full_name", "phone", "email", "city", "is_processed")
