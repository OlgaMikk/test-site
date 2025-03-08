from django.apps import AppConfig


class HistoryConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "history"
    verbose_name = "История компании"
    verbose_name_plural = "Истории компании"
