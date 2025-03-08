from django.urls import path

from history.views import CompanyHistoryListView, CompanyHistoryYearListView

urlpatterns = [
    path("", CompanyHistoryListView.as_view(), name="company_history_list"),
    path("year/", CompanyHistoryYearListView.as_view(), name="company_history_year_list"),
]
