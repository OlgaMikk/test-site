from django.urls import path

from bank.views import BankListView

urlpatterns = [
    path("", BankListView.as_view(), name="bank_list"),
]
