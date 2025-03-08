from django_filters import rest_framework as filters
from drf_spectacular.utils import extend_schema
from rest_framework import generics

from project.paginations import StandardResultsSetPagination
from utils.decorators import extend_endpoint

from . import serializers
from .filters import ProjectFilter
from .models import City, Project


class CityListView(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = serializers.CitySerializer

    @extend_schema(
        summary="List [City]",
        description="List cities",
        responses={200: serializers.CitySerializer},
    )
    @extend_endpoint(serializer_class=serializers.CitySerializer)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    http_method_names = ["get"]
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProjectFilter

    def get_queryset(self):
        return self.queryset.filter(is_published=True)

    @extend_schema(
        summary="List [Project]",
        description="List projects",
        responses={200: serializers.ProjectSerializer},
    )
    @extend_endpoint(serializer_class=serializers.ProjectSerializer)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class ProjectRetrieveView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    http_method_names = ["get"]
    lookup_field = "slug"

    def get_queryset(self):
        return self.queryset.filter(is_published=True)

    @extend_schema(
        summary="Retrieve [Project]",
        description="Retrieve project id",
        responses={200: serializers.ProjectSerializer},
    )
    @extend_endpoint(serializer_class=serializers.ProjectSerializer)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
