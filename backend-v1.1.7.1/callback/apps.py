from django.apps import AppConfig


class CallbackConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "callback"
    verbose_name = "Обратная связь"
    verbose_name_plural = "Обратная связь"

    def ready(self):
        import callback.callback.signals  # noqa: F401
        import callback.reservation.signals  # noqa: F401
