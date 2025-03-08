from django_filters import rest_framework as filters
from drf_spectacular.utils import extend_schema
from rest_framework import generics

from project.paginations import StandardResultsSetPagination
from project.room import serializers
from project.room.filters import RoomFilter
from project.room.models import Room
from utils.decorators import extend_endpoint


class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = serializers.RoomSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RoomFilter

    def get_queryset(self):
        slug = self.kwargs.get("slug")
        return self.queryset.filter(is_sold=False, blocked_at=None, estate_object__project__slug=slug)

    @extend_schema(
        summary="List [Room]",
        description="List rooms",
        responses={200: serializers.RoomSerializer},
    )
    @extend_endpoint(serializer_class=serializers.RoomSerializer)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
