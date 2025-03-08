from django import forms

from utils.forms import MaxRelationFormMixin

from .models import Project


class ProjectForm(forms.ModelForm, MaxRelationFormMixin):
    class Meta:
        model = Project
        fields = "__all__"

    def clean(self):
        cleaned_data = super().clean()
        errors_dict = {}

        self.validate_max_relations(
            cleaned_data,
            "advantages",
            5,
            errors_dict,
            "Количество преимуществ не должно превышать {limit}",
        )
        self.validate_max_relations(
            cleaned_data,
            "featured_advantages",
            2,
            errors_dict,
            "Количество избранных преимуществ не должно превышать {limit}",
        )

        if errors_dict:
            raise forms.ValidationError(errors_dict)
