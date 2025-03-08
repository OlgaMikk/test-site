from drf_spectacular.utils import extend_schema
from rest_framework import generics, status
from rest_framework.response import Response

from callback.reservation import serializers
from callback.reservation.models import ConfirmReservation, Reservation
from callback.reservation.serializers import (
    ConfirmReservationSerializer,
    ReservationSerializer,
)
from utils.decorators import extend_endpoint


class ConfirmReservationView(generics.CreateAPIView):
    queryset = ConfirmReservation.objects.all()
    serializer_class = ConfirmReservationSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        try:
            existing_instance = self.get_queryset().get(email=data["email"])
            serializer = self.get_serializer(existing_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ConfirmReservation.DoesNotExist:
            pass

        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Create [ConfirmReservation]",
        description="Create confirmation reservation",
        responses={200: serializers.ConfirmReservationSerializer},
    )
    @extend_endpoint(serializer_class=serializers.ConfirmReservationSerializer)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class ReservationView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    @extend_schema(
        summary="Create [Reservation]",
        description="Create reservation",
        responses={200: serializers.ReservationSerializer},
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
