from django.urls import path

from modules.views import JumbotronListView

urlpatterns = [
    path("jumbotron/", JumbotronListView.as_view(), name="jumbotron_list"),
]
