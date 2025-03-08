from django_filters import rest_framework as filters
from seo.models import ModelInstanceSeo, ViewSeo


class ViewSeoFilter(filters.FilterSet):
    class Meta:
        model = ViewSeo
        fields = ("view",)


class ModelInstanceSeoFilter(filters.FilterSet):
    class Meta:
        model = ModelInstanceSeo
        fields = ("object_id", "content_type")
