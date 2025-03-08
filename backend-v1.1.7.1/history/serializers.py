from rest_framework import serializers

from history.models import CompanyHistory, CompanyHistoryBlock


class CompanyHistoryBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyHistoryBlock
        fields = "__all__"


class CompanyHistorySerializer(serializers.ModelSerializer):
    blocks = CompanyHistoryBlockSerializer(many=True)

    class Meta:
        model = CompanyHistory
        fields = "__all__"


class CompanyHistoryYearSerializer(serializers.Serializer):
    year = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CompanyHistory
