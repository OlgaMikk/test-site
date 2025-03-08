from django.apps import AppConfig


class SettingConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "setting"
    verbose_name = "Настройка"
    verbose_name_plural = "Настройки"
