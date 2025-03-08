from django.urls import path

from career.views import JobResponseCreateView, VacancyListView

urlpatterns = [
    path("vacancy/", VacancyListView.as_view(), name="vacancy_list"),
    path("job/response/", JobResponseCreateView.as_view(), name="job_response_create"),
]
