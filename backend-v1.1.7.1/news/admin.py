from adminsortable2.admin import SortableAdminMixin
from django.contrib import admin
from nested_admin.nested import NestedModelAdmin

from news.inline import ArticleBlockInLine
from news.models import Author, News


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "position",
    )
    search_fields = ("full_name",)


@admin.register(News)
class NewsAdmin(SortableAdminMixin, NestedModelAdmin):
    inlines = [
        ArticleBlockInLine,
    ]
    readonly_fields = (
        "publication_date",
        "user_rating",
    )
    list_filter = ("category", "publication_date")
    autocomplete_fields = ("project", "author")
