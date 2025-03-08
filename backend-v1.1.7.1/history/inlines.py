from nested_admin.forms import SortableHiddenMixin
from nested_admin.nested import NestedTabularInline

from history.models import CompanyHistoryBlock


class CompanyHistoryBlockNestedTabularInline(SortableHiddenMixin, NestedTabularInline):
    model = CompanyHistoryBlock
    sortable_field_name = "order"
    autocomplete_fields = ("company_history",)
    max_num = 12
    extra = 0
