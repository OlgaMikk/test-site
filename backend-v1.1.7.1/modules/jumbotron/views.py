from drf_spectacular.utils import extend_schema
from rest_framework import generics

from modules.jumbotron import serializers
from modules.jumbotron.models import Jumbotron


class JumbotronListView(generics.ListAPIView):
    queryset = Jumbotron.objects.all()
    serializer_class = serializers.JumbotronSerializer

    @extend_schema(
        summary="List [Jumbotron[]]",
        description="List of all existed Jumbotrons",
        responses={200: serializers.JumbotronSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
