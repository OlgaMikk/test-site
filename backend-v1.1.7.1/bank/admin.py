from django.contrib import admin

from bank.models import Bank


@admin.register(Bank)
class BankAdmin(admin.ModelAdmin):
    pass
