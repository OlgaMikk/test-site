from django.urls import path

from setting.views import ModelInstanceSeoListView, SettingListView, ViewSeoListView

urlpatterns = [
    path("", SettingListView.as_view(), name="setting"),
    path("seo/view", ViewSeoListView.as_view(), name="seo_view"),
    path("seo/model", ModelInstanceSeoListView.as_view(), name="seo_model"),
]
