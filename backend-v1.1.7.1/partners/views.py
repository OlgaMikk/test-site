from drf_spectacular.utils import extend_schema
from rest_framework import generics

from partners.models import Partner
from partners.serializers import PartnerSerializer


class PartnersListView(generics.ListAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

    @extend_schema(
        summary="List [Partner[]]",
        description="List of all existed Partners",
        responses={200: PartnerSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
