from django.urls import include, path, re_path
from django.views.generic import RedirectView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from .base import urlpatterns as base_url_patterns
from .views import SpectacularElementsView

urlpatterns = [
    path("", RedirectView.as_view(url="elements/")),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("elements/", SpectacularElementsView.as_view(url_name="schema"), name="elements"),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path("swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("modules/", include("modules.urls")),
    path("company_history/", include("history.urls")),
    path("project/", include("project.urls")),
    path("team/", include("team.urls")),
    path("callback/", include("callback.urls")),
    path("career/", include("career.urls")),
    path("notification/", include("notification.urls")),
    path("bank/", include("bank.urls")),
    path("setting/", include("setting.urls")),
    path("partner/", include("partners.urls")),
    path("news/", include("news.urls")),
    re_path(r"^_nested_admin/", include("nested_admin.urls")),
    path("tinymce/", include("tinymce.urls")),
]

urlpatterns += base_url_patterns
