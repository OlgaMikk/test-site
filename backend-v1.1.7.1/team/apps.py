from django.apps import AppConfig


class TeamConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "team"
    verbose_name = "Команда"
    verbose_name_plural = "Команды"
