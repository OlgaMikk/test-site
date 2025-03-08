from django.contrib import admin

from partners.models import Partner


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    pass
