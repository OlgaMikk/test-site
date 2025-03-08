from django.contrib import admin

from callback.reservation.models import ConfirmReservation, Reservation


@admin.register(ConfirmReservation)
class ConfirmReservationAdmin(admin.ModelAdmin):
    list_display = ("email", "code", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "phone")
    list_filter = ("created_at", "updated_at")
