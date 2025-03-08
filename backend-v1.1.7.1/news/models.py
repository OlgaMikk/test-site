from django.contrib.sessions.models import Session
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import Avg
from tinymce.models import HTMLField

from project.project.models import Project


class Author(models.Model):
    full_name = models.CharField("ФИО", max_length=255)
    avatar = models.ImageField("Аватар", upload_to="author_avatars/")
    position = models.CharField("Должность", max_length=255)

    news: ["News", models.Manager]

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "Автор"
        verbose_name_plural = "Авторы"


class ArticleBlock(models.Model):
    news = models.ForeignKey("News", on_delete=models.CASCADE, verbose_name="Новость", related_name="article_blocks")
    text = HTMLField("Текст")
    image = models.ImageField("Изображение", upload_to="article_blocks/")
    order = models.PositiveIntegerField(
        verbose_name="Порядок",
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = ("order",)
        verbose_name = "Блок новости"
        verbose_name_plural = "Блоки новостей"


class Rating(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    news = models.ForeignKey("News", on_delete=models.CASCADE, related_name="user_ratings")
    score = models.PositiveIntegerField()

    class Meta:
        unique_together = ("session", "news")
        verbose_name = "Рейтинг"
        verbose_name_plural = "Рейтинги"


class News(models.Model):
    CATEGORY_CHOICES = [
        ("blog", "Блог"),
        ("analytics", "Аналитика"),
    ]
    slug = models.SlugField(verbose_name="Slug", unique=True, null=True, blank=True, max_length=125)
    title = models.CharField("Заголовок", max_length=255)
    publication_date = models.DateField("Дата публикации", auto_now_add=True)
    category = models.CharField("Категория", max_length=10, choices=CATEGORY_CHOICES)
    project = models.ForeignKey(
        Project,
        verbose_name="Проект",
        on_delete=models.SET_NULL,
        related_name="news",
        null=True,
        blank=True,
        default=None,
    )
    author = models.ForeignKey(
        Author,
        verbose_name="Автор",
        on_delete=models.SET_NULL,
        related_name="news",
        null=True,
        default=None,
    )
    rating = models.FloatField(
        "Рейтинг",
        default=None,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        null=True,
        blank=True,
    )
    user_rating = models.FloatField(
        "Пользовательский рейтинг",
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        editable=False,
    )
    order = models.PositiveIntegerField(
        verbose_name="Порядок",
        default=0,
        blank=False,
        null=False,
    )

    article_blocks: [ArticleBlock, models.Manager]
    user_ratings: [Rating, models.Manager]

    def update_user_rating(self):
        avg_user_rating = self.user_ratings.aggregate(Avg("score"))["score__avg"]
        self.user_rating = avg_user_rating if avg_user_rating else 0
        self.save()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ("order",)
        verbose_name = "Новость"
        verbose_name_plural = "Новости"
