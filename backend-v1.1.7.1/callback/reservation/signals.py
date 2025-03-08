from datetime import timedelta

from django.conf import settings
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.utils import timezone

from callback.reservation.models import ConfirmReservation, Reservation
from notification.models import Email


@receiver(post_save, sender=ConfirmReservation)
def send_mess_confirm_reservation(sender, instance, **kwargs):
    created = kwargs.pop("created")
    if created:
        html_message = render_to_string("confirm_reservation.html", context={"object": instance})

        send_mail(
            "Подтверждение бронирования",
            html_message,
            settings.EMAIL_HOST_USER,
            [instance.email],
            html_message=html_message,
            fail_silently=False,
        )


@receiver(post_save, sender=Reservation)
def send_mess_reservation(sender, instance, **kwargs):
    created = kwargs.pop("created")
    if created:
        instance.room.blocked_at = timezone.now() + timedelta(hours=24)
        instance.room.save()

        emails = Email.objects.filter(enabled_notifications__system_name="reservation").values_list("email", flat=True)
        html_message = render_to_string(
            "reservation.html",
            context={"object": instance, "url_site": settings.URL_SITE},
        )
        send_mail(
            "Бронирование",
            html_message,
            settings.EMAIL_HOST_USER,
            emails,
            html_message=html_message,
            fail_silently=False,
        )


@receiver(post_save, sender=Reservation)
def check_is_sold(sender, instance, **kwargs):
    if instance.room.is_sold:
        instance.room.blocked_at = None
        instance.room.save()
