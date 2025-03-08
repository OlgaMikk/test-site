from typing import List

from rest_framework import serializers

from career.models import JobResponse, Vacancy


class VacancySerializer(serializers.ModelSerializer):
    conditions = serializers.SerializerMethodField()
    requirements = serializers.SerializerMethodField()

    def get_conditions(self, obj) -> List[str]:
        return obj.conditions.splitlines()

    def get_requirements(self, obj) -> List[str]:
        return obj.requirements.splitlines()

    class Meta:
        model = Vacancy
        fields = "__all__"


class JobResponseSerializer(serializers.ModelSerializer):

    def validate(self, data):
        vacancy = data.get("vacancy")
        specialty = data.get("specialty")
        if not vacancy and not specialty:
            raise serializers.ValidationError(
                {
                    "vacancy": "Должны быть указаны или vacancy, или specialty, или оба.",
                    "specialty": "Должны быть указаны или vacancy, или specialty, или оба.",
                },
            )
        return data

    class Meta:
        model = JobResponse
        fields = "__all__"
