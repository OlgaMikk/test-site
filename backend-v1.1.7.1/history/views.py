from django_filters.rest_framework.backends import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListAPIView

from history.models import CompanyHistory
from history.serializers import CompanyHistorySerializer, CompanyHistoryYearSerializer


class CompanyHistoryListView(ListAPIView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("year",)

    @extend_schema(
        summary="List [CompanyHistory]",
        description="List company histories",
        responses={200: CompanyHistorySerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class CompanyHistoryYearListView(ListAPIView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistoryYearSerializer

    @extend_schema(
        summary="List [CompanyHistoryYear]",
        description="List years of company histories",
        responses={200: CompanyHistoryYearSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
