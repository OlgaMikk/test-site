from django_filters import rest_framework as filters

from .models import Project


class ProjectFilter(filters.FilterSet):
    city_slug = filters.CharFilter(field_name="city__slug", lookup_expr="iexact")

    class Meta:
        model = Project
        fields = (
            "type",
            "city",
            "city_slug",
        )
