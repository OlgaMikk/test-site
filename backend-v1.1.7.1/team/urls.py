from django.urls import path

from team.views import EmployeeListView

urlpatterns = [
    path("employee/", EmployeeListView.as_view(), name="employee_list"),
]
