from django.apps import AppConfig


class NewsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "news"
    verbose_name = "Новость"
    verbose_name_plural = "Новости"

    def ready(self):
        import news.signals  # noqa: F401
