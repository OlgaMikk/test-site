from django.urls import path

from news.views import (
    AuthorListView,
    NewsListView,
    NewsRatingRetrieveUpdateView,
    NewsRetrieveView,
    NewsYearListView,
)

urlpatterns = [
    path("", NewsListView.as_view(), name="news_list"),
    path("year/", NewsYearListView.as_view(), name="news_year_list"),
    path("author/", AuthorListView.as_view(), name="author_list"),
    path("<slug:slug>/", NewsRetrieveView.as_view(), name="news_detail"),
    path("rating/<int:news>/", NewsRatingRetrieveUpdateView.as_view(), name="news_rating_detail"),
]
