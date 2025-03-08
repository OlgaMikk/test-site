from django.apps import AppConfig


class ProjectConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "project"
    verbose_name = "Проект"
    verbose_name_plural = "Проекты"

    def ready(self):
        import project.project.signals  # noqa: F401
