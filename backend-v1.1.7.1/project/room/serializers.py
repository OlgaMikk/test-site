from rest_framework import serializers

from project.room.models import Layout, Room


class LayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layout
        fields = "__all__"


class RoomSerializer(serializers.ModelSerializer):
    layout = LayoutSerializer()

    class Meta:
        model = Room
        fields = (
            "id",
            "estate_object",
            "flat",
            "floor",
            "layout",
            "price",
        )
