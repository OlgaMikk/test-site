from drf_spectacular.utils import extend_schema
from rest_framework.generics import CreateAPIView, ListAPIView

from career.models import JobResponse, Vacancy
from career.serializers import JobResponseSerializer, VacancySerializer


class VacancyListView(ListAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer

    @extend_schema(
        summary="List [Vacancy[]]",
        description="List vacancies",
        responses={200: VacancySerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class JobResponseCreateView(CreateAPIView):
    queryset = JobResponse.objects.all()
    serializer_class = JobResponseSerializer

    @extend_schema(
        summary="Create [JobResponse]",
        description="Create job response",
        responses={201: JobResponseSerializer},
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
