from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from user.forms import UserCustomChangeForm, UserCustomCreationForm

admin.site.unregister(User)


# Register your models here.
class UserCustomAdmin(UserAdmin):
    add_form = UserCustomCreationForm
    form = UserCustomChangeForm
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "email", "password1", "password2"),
            },
        ),
    )


admin.site.register(User, UserCustomAdmin)
