from django_filters import rest_framework as filters
from rest_framework import generics
from seo.models import ModelInstanceSeo, ViewSeo

from project.paginations import StandardResultsSetPagination
from setting.filters import ModelInstanceSeoFilter, ViewSeoFilter
from setting.models import Setting
from setting.serializers import (
    ModelInstanceSeoSerializer,
    SettingSerializer,
    ViewSeoSerializer,
)


class SettingListView(generics.ListAPIView):
    queryset = Setting.objects.all()
    serializer_class = SettingSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class ViewSeoListView(generics.ListAPIView):
    queryset = ViewSeo.objects.all()
    serializer_class = ViewSeoSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ViewSeoFilter


class ModelInstanceSeoListView(generics.ListAPIView):
    queryset = ModelInstanceSeo.objects.all()
    serializer_class = ModelInstanceSeoSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ModelInstanceSeoFilter
