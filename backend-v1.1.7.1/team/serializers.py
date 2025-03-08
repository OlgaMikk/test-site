from typing import Optional

from rest_framework import serializers

from team.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"

    def get_quote(self, obj) -> Optional[str]:
        return obj.quote if obj.type == Employee.TypeEmployee.supervisor else ""
