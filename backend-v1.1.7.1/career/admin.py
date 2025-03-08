from django.contrib import admin

from career.models import JobResponse, Vacancy


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ("position", "salary")
    search_fields = ("position",)


@admin.register(JobResponse)
class JobResponseAdmin(admin.ModelAdmin):
    list_display = ("full_name", "applied_to")
    autocomplete_fields = ("vacancy",)
