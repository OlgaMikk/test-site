from django.urls import path

from project.room.views import RoomListView
from project.views import CityListView, ProjectListView, ProjectRetrieveView

urlpatterns = [
    path("", ProjectListView.as_view(), name="project_list"),
    path("city/", CityListView.as_view(), name="city_list"),
    path("<slug:slug>/", ProjectRetrieveView.as_view(), name="project_detail"),
    path("<slug:slug>/room/", RoomListView.as_view(), name="room_list"),
]
