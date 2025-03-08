from rest_framework import exceptions, serializers

from callback.reservation.models import ConfirmReservation, Reservation


class ConfirmReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfirmReservation
        fields = ("email", "project")


class ReservationSerializer(serializers.ModelSerializer):
    code = serializers.CharField(max_length=6, write_only=True)

    class Meta:
        model = Reservation
        fields = (
            "full_name",
            "email",
            "phone",
            "room",
            "created_at",
            "updated_at",
            "code",
        )

    def create(self, validated_data):
        email = validated_data.get("email", None)
        code = validated_data.pop("code", None)

        check_confirm_reservation = ConfirmReservation.objects.filter(email=email, code=code).exists()
        if check_confirm_reservation:
            return Reservation.objects.create(**validated_data)

        raise exceptions.ValidationError("Invalid code")
