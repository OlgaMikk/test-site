from django.contrib.sessions.models import Session
from django.db.models import functions
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import generics, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from news.models import Author, News, Rating
from news.paginators import NewsPageNumberPagination
from news.serializers import (
    AuthorSerializer,
    NewsListSerializer,
    NewsRetrieveSerializer,
    NewsYearSerializer,
    RatingSerializer,
)


class AuthorListView(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    @extend_schema(
        summary="List [Author[]]",
        description="List of all existed Authors",
        responses={200: AuthorSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class NewsListView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsListSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = {
        "category": ["exact"],
        "project": ["exact"],
        "publication_date": ["year"],
    }
    pagination_class = NewsPageNumberPagination

    @extend_schema(
        summary="List [News[]]",
        description="List of all existed News",
        responses={200: NewsListSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class NewsRetrieveView(generics.RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsRetrieveSerializer
    lookup_field = "slug"

    @extend_schema(
        summary="Retrieve [News]",
        description="Retrieve News by id",
        responses={200: NewsRetrieveSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class NewsYearListView(ListAPIView):
    queryset = (
        News.objects.annotate(year=functions.ExtractYear("publication_date")).values("year").distinct().order_by()
    )
    serializer_class = NewsYearSerializer

    @extend_schema(
        summary="List [NewsYear]",
        description="List years of News",
        responses={200: NewsYearSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class NewsRatingRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    lookup_field = "news"
    http_method_names = [
        "get",
        "patch",
    ]

    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        session_key = self.request.session.session_key
        session = get_object_or_404(Session, session_key=session_key)
        return queryset.filter(session=session)

    @extend_schema(
        summary="Retrieve [Rating]",
        description="Updates rating of News",
        responses={200: RatingSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_or_create_session(self):
        session_key = self.request.session.session_key
        if not session_key:
            self.request.session.create()
            session_key = self.request.session.session_key
        session = Session.objects.get(session_key=session_key)
        return session

    def get_news_or_404(self):
        return get_object_or_404(News, pk=self.kwargs.get(self.lookup_field))

    def validate_request_rating_score(self):
        data = self.request.data.copy()
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

    @extend_schema(
        summary="Update [Rating]",
        description="Updates rating of News",
        responses={200: RatingSerializer},
    )
    def patch(self, request, *args, **kwargs):
        self.validate_request_rating_score()
        session = self.get_or_create_session()
        news = self.get_news_or_404()
        rating, created = Rating.objects.update_or_create(
            session=session,
            news=news,
            defaults={"score": request.data.get("score")},
        )
        rating_serializer = self.get_serializer(rating)
        news.update_user_rating()
        return Response(rating_serializer.data, status=status.HTTP_201_CREATED)
