from django.contrib.auth.forms import UserChangeForm, UserCreationForm


class EmailRequiredMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # make user email field required
        self.fields["email"].required = True


class UserCustomCreationForm(EmailRequiredMixin, UserCreationForm):
    pass


class UserCustomChangeForm(EmailRequiredMixin, UserChangeForm):
    pass
