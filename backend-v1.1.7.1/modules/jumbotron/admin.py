from adminsortable2.admin import SortableAdminMixin
from django.contrib import admin

from modules.jumbotron.models import Jumbotron


@admin.register(Jumbotron)
class JumbotronAdmin(SortableAdminMixin, admin.ModelAdmin):
    pass
