from rest_framework import serializers

from modules.jumbotron.models import Jumbotron


class JumbotronSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jumbotron
        fields = "__all__"
