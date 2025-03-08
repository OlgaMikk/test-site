from django.urls import path

from notification.views import NotificationEmailView

urlpatterns = [
    path("email/", NotificationEmailView.as_view(), name="email_notification_action"),
]
