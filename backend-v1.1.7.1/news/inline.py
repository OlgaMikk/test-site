from nested_admin.forms import SortableHiddenMixin
from nested_admin.nested import NestedTabularInline

from news.models import ArticleBlock


class ArticleBlockInLine(SortableHiddenMixin, NestedTabularInline):
    model = ArticleBlock
    sortable_field_name = "order"
    extra = 0
