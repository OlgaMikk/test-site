from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListAPIView

from team.models import Employee
from team.serializers import EmployeeSerializer


class EmployeeListView(ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    @extend_schema(
        summary="List [Employee]",
        description="List employees",
        responses={200: EmployeeSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
