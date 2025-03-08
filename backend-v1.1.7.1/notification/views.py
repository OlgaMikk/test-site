from django.shortcuts import get_object_or_404, redirect
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import generics

from notification import serializers
from notification.models import Email, NotificationType


class NotificationEmailView(generics.RetrieveAPIView):
    queryset = Email.objects.all()
    serializer_class = serializers.EmailSerializer

    def get_object(self):
        user = self.request.user
        instance, _ = Email.objects.get_or_create(user=user, email=user.email)

        notification_type_system_name = self.request.query_params.get("notification_type")
        notification_action = self.request.query_params.get("action", "subscribe")
        notification_type = get_object_or_404(NotificationType, system_name=notification_type_system_name)

        email_notification: Email = user.email_notification

        if notification_action == "subscribe":
            email_notification.enabled_notifications.add(notification_type)
        if notification_action == "unsubscribe":
            email_notification.enabled_notifications.remove(notification_type)

        return instance

    @extend_schema(
        summary="Action with [Email]",
        description="Subscribe/Unsubscribe for specific type notification",
        parameters=[
            OpenApiParameter(
                name="action",
                type=OpenApiTypes.STR,
                enum=["subscribe", "unsubscribe"],
                required=True,
                allow_blank=False,
            ),
            OpenApiParameter(
                name="notification_type",
                type=OpenApiTypes.STR,
                enum=NotificationType.objects.all().values_list("system_name", flat=True),
                required=True,
                allow_blank=False,
            ),
        ],
    )
    def get(self, request, *args, **kwargs):
        super().get(request, *args, **kwargs)
        return redirect(request.META.get("HTTP_REFERER"))
