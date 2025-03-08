from drf_spectacular.utils import extend_schema
from rest_framework import generics

from bank.models import Bank
from bank.serializers import BankSerializer
from utils.decorators import extend_endpoint


class BankListView(generics.ListAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

    @extend_schema(
        summary="List [Bank]",
        description="List of banks",
        responses={200: BankSerializer},
    )
    @extend_endpoint(serializer_class=BankSerializer)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
