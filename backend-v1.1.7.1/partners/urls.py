from django.urls import path

from partners.views import PartnersListView

urlpatterns = [
    path("", PartnersListView.as_view(), name="partners_list"),
]
