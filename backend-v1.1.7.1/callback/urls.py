from django.urls import path

from callback.views import CallbackCreateView, ConfirmReservationView, ReservationView

urlpatterns = [
    path("", CallbackCreateView.as_view(), name="callback_create"),
    path("confirm/", ConfirmReservationView.as_view(), name="confirm_reservation"),
    path("reservation/", ReservationView.as_view(), name="reservation"),
]
