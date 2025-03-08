from rest_framework import serializers

from callback.models import Callback


class CallbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Callback
        fields = ("full_name", "phone", "email", "city")
