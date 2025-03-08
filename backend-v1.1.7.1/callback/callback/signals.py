from django.conf import settings
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string

from callback.models import Callback
from notification.models import Email


@receiver(post_save, sender=Callback)
def send_message(sender, instance, **kwargs):
    created = kwargs.pop("created")
    if created:
        emails = Email.objects.filter(enabled_notifications__system_name="feedback").values_list("email", flat=True)

        html_message = render_to_string("callback.html", context={"object": instance, "url_site": settings.URL_SITE})
        send_mail(
            "Оформленная заявка на обратный звонок",
            html_message,
            settings.EMAIL_HOST_USER,
            emails,
            html_message=html_message,
            fail_silently=False,
        )
