from rest_framework import serializers
from seo.models import ModelInstanceSeo, ViewSeo

from project.project.serializers import ProjectSerializer
from setting.models import Setting


class SettingSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = Setting
        fields = (
            "id",
            "phone",
            "email",
            "inn",
            "ogrn",
            "privacy_policy",
            "data_processing",
            "projects",
        )


class ViewSeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewSeo
        fields = "__all__"


class ModelInstanceSeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelInstanceSeo
        fields = "__all__"
