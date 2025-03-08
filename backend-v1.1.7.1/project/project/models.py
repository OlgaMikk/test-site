import typing
from typing import Union

from django.core.validators import FileExtensionValidator, MinValueValidator
from django.db import models

if typing.TYPE_CHECKING:
    from news.models import News
from project.room.models import Room
from utils.dates import current_month, current_year, month_choices


class Icon(models.Model):
    title = models.CharField("Название", max_length=125)
    icon = models.FileField(
        "Иконка",
        upload_to="icons/",
        validators=[FileExtensionValidator(["svg", "png", "jpg", "jpeg"])],
        help_text="Можно загрузить файлы: svg, png, jpg, jpeg",
    )
    svg_text = models.TextField("Текст SVG", blank=True)

    advantages: Union["Advantage", models.Manager]
    icon_geotags: Union["Geotag", models.Manager]

    def save(self, *args, **kwargs):
        if self.icon.file.content_type == "image/svg+xml":
            self.svg_text = self.icon.file.file.read()
        super().save(*args, **kwargs)

    class Meta:
        ordering = ("title",)
        verbose_name = "Иконка"
        verbose_name_plural = "Иконки"

    def __str__(self):
        return self.title


class Advantage(models.Model):
    title = models.CharField("Название", max_length=125)
    icon = models.ForeignKey(Icon, on_delete=models.CASCADE, verbose_name="Иконка", related_name="advantages")

    class Meta:
        verbose_name = "Преимущество"
        verbose_name_plural = "Преимущества"

    def __str__(self):
        return self.title


class Image(models.Model):
    project = models.ForeignKey(
        "Project",
        on_delete=models.CASCADE,
        verbose_name="Проект",
        related_name="images",
    )
    image = models.ImageField("Изображение", upload_to="images/")
    order = models.PositiveIntegerField(
        verbose_name="Порядок",
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"


class City(models.Model):
    slug = models.SlugField(verbose_name="Slug", unique=True, null=True, blank=True, max_length=125)
    title = models.CharField("Название", max_length=255)

    projects: Union["Project", models.Manager]

    class Meta:
        verbose_name = "Город"
        verbose_name_plural = "Города"

    def __str__(self):
        return self.title


class EstateObject(models.Model):
    project = models.ForeignKey(
        "Project",
        on_delete=models.CASCADE,
        verbose_name="Проект",
        related_name="estate_objects",
    )
    title = models.CharField("Название", max_length=255)
    corps = models.IntegerField("Корпус", default=0)
    area_min = models.FloatField(
        "Минимальная площадь",
        validators=[
            MinValueValidator(0.0),
        ],
        default=0,
    )
    area_max = models.FloatField(
        "Максимальная площадь",
        validators=[
            MinValueValidator(0.0),
        ],
        default=0,
    )
    floor_count = models.PositiveIntegerField("Этажность", default=0)
    room_count = models.PositiveIntegerField("Количество комнат", default=0)

    rooms: Union["Room", models.Manager]

    class Meta:
        verbose_name = "Объект недвижимости"
        verbose_name_plural = "Объекты недвижимости"

    def __str__(self):
        return self.title

    # @property
    # def floor_max(self):
    #     return self.rooms.aggregate(Max("floor"))["floor__max"]
    #
    # @property
    # def floor_min(self):
    #     return self.rooms.aggregate(Min("floor"))["floor__min"]
    #
    # @property
    # def price_max(self):
    #     return self.rooms.aggregate(Max("price"))["price__max"]
    #
    # @property
    # def price_min(self):
    #     return self.rooms.aggregate(Min("price"))["price__min"]
    #
    # @property
    # def square_max(self) -> int:
    #     if self.rooms.exists():
    #         return self.rooms.filter(layout__square__isnull=False).aggregate(Max("layout__square"))[
    #             "layout__square__max"
    #         ]
    #     return 0
    #
    # @property
    # def square_min(self) -> int:
    #     if self.rooms.exists():
    #         return self.rooms.filter(layout__square__isnull=False).aggregate(Min("layout__square"))[
    #             "layout__square__min"
    #         ]
    #     return 0
    #
    # @property
    # def rooms_count(self) -> int:
    #     return self.rooms.count()
    #
    # @property
    # def rooms_max(self):
    #     return self.rooms.filter(layout__square__isnull=False).aggregate(Max("layout__room"))["layout__room__max"]
    #
    # @property
    # def rooms_min(self):
    #     return self.rooms.filter(layout__square__isnull=False).aggregate(Min("layout__room"))["layout__room__min"]


class Location(models.Model):
    title = models.CharField("Заголовок", max_length=125)
    description = models.TextField("Описание")
    image = models.ImageField("Изображение", upload_to="locations/")
    ya_maps_link = models.URLField("Ссылка на яндекс карты", blank=True, null=True)

    routes: Union["Route", models.Manager]

    class Meta:
        ordering = ["title"]
        verbose_name = "Расположение"
        verbose_name_plural = "Расположения"

    def __str__(self):
        return self.title


class Route(models.Model):
    location = models.ForeignKey(
        "Location",
        on_delete=models.CASCADE,
        verbose_name="Расположение",
        related_name="routes",
    )
    icon = models.FileField(
        "Иконка",
        upload_to="routes/",
        validators=[FileExtensionValidator(["svg", "png", "jpg", "jpeg"])],
        help_text="Можно загрузить файлы: svg, png, jpg, jpeg",
    )
    destination = models.CharField("Точка назначения", max_length=30)
    travel_time = models.CharField("Время в пути", max_length=30)

    order = models.PositiveIntegerField(
        verbose_name="Порядок",
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Маршрут"
        verbose_name_plural = "Маршруты"

    def __str__(self):
        return f"{self.destination} {self.travel_time}"


class TextBlock(models.Model):
    project = models.ForeignKey(
        "Project",
        on_delete=models.CASCADE,
        verbose_name="Проект",
        related_name="text_blocks",
    )
    title = models.CharField("Заголовок", max_length=125)
    horizontal_image = models.ImageField("Горизонтальное изображение", upload_to="horizontal_text_blocks/")
    square_image = models.ImageField("Квадратное изображение", upload_to="square_text_blocks/")
    text = models.TextField("Текст")
    order = models.PositiveIntegerField(
        verbose_name="Порядок",
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Универсальный текстовый блок"
        verbose_name_plural = "Универсальные текстовые блоки"

    def __str__(self):
        return self.title


class Geotag(models.Model):
    title = models.CharField("Название", max_length=125)
    project = models.ForeignKey("Project", on_delete=models.CASCADE, verbose_name="Проект", related_name="geotags")
    icon = models.ForeignKey(Icon, on_delete=models.CASCADE, verbose_name="Иконка", related_name="icon_geotags")
    longitude = models.DecimalField("Долгота", max_digits=9, decimal_places=6, default=0)
    latitude = models.DecimalField("Широта", max_digits=9, decimal_places=6, default=0)
    order = models.PositiveIntegerField(
        verbose_name="Порядок",
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Геометка"
        verbose_name_plural = "Геометки"

    def __str__(self):
        return f"{self.title} {str(self.longitude)} {str(self.latitude)}"


class BuildingProgressImage(models.Model):
    building_progress = models.ForeignKey(
        "BuildingProgress",
        on_delete=models.CASCADE,
        verbose_name="Прогресс строительства",
        related_name="images",
    )
    image = models.ImageField("Изображение", upload_to="building_progress_images/")
    order = models.PositiveIntegerField(
        verbose_name="Порядок",
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Изображение прогресса строительства"
        verbose_name_plural = "Изображения прогрессов строительства"


class BuildingProgress(models.Model):
    project = models.ForeignKey(
        "Project",
        on_delete=models.CASCADE,
        verbose_name="Проект",
        related_name="building_progresses",
    )
    year = models.IntegerField("Год", default=current_year)
    month = models.PositiveSmallIntegerField("Месяц", choices=month_choices(), default=current_month)
    description = models.TextField("Краткое описание", blank=True)
    order = models.PositiveIntegerField(
        verbose_name="Порядок",
        default=0,
        blank=False,
        null=False,
    )

    images: Union["BuildingProgressImage", models.Manager]

    class Meta:
        ordering = ["order"]
        verbose_name = "Прогресс строительства"
        verbose_name_plural = "Прогрессы строительства"

    def __str__(self):
        return f"{self.project.title} {self.get_month_display()} {str(self.year)}"


class Project(models.Model):
    class TypeHouse(models.TextChoices):
        housing = "housing", "Жилье"
        business_space = "business_space", "Бизнес-Пространство"

    slug = models.SlugField(verbose_name="Slug", unique=True, null=True, blank=True, max_length=125)
    title = models.CharField("Название", max_length=125)
    city = models.ForeignKey(City, on_delete=models.CASCADE, verbose_name="Город", related_name="projects")
    logo = models.ImageField("Логотип", upload_to="logos/", null=True, blank=True)
    icon = models.FileField(
        "Иконка",
        upload_to="project_icons/",
        validators=[FileExtensionValidator(["svg", "png", "jpg", "jpeg"])],
        help_text="Можно загрузить файлы: svg, png, jpg, jpeg",
        blank=True,
    )
    image = models.ImageField("Изображение", upload_to="projects/")
    short_description = models.TextField("Краткое описание")
    short_description_image = models.ImageField(
        "Изображение для краткого описания",
        upload_to="short_descriptions/",
        null=True,
        blank=True,
    )
    featured_advantages = models.ManyToManyField(
        Advantage,
        verbose_name="Избранные преимущества",
        related_name="featured_projects",
    )
    advantages = models.ManyToManyField(Advantage, verbose_name="Преимущества", related_name="projects")
    description = models.TextField("Описание")
    housing_description = models.TextField("Описание корпусов")
    catalog_btn_link = models.CharField('Ссылка кнопки "Смотреть каталог"', max_length=125, blank=True)
    is_catalog_btn_enable = models.BooleanField('Ссылка кнопки "Смотреть каталог" активна', default=False)
    address = models.CharField("Адрес", max_length=255)
    longitude = models.DecimalField("Долгота", max_digits=9, decimal_places=6, default=0)
    latitude = models.DecimalField("Широта", max_digits=9, decimal_places=6, default=0)
    type = models.CharField(
        "Тип",
        max_length=45,
        choices=TypeHouse.choices,
        default=TypeHouse.housing,
    )
    video_url = models.URLField(verbose_name="Ссылка на видео", blank=True, null=True)
    tour_3d_url = models.URLField(verbose_name="3D тур", blank=True, null=True)
    location = models.OneToOneField(
        Location,
        on_delete=models.CASCADE,
        verbose_name="Расположение",
        null=True,
        blank=True,
    )
    is_published = models.BooleanField("Опубликовано", default=False)

    estate_objects: Union[EstateObject, models.Manager]
    images: Union[Image, models.Manager]
    text_blocks: Union[TextBlock, models.Manager]
    geotags: Union[Geotag, models.Manager]
    building_progresses: Union[BuildingProgress, models.Manager]
    news: Union["News", models.Manager]

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"

    def __str__(self):
        return self.title

    # def save(self, *args, **kwargs):
    #     if not self.slug:
    #         title = self.title
    #         slug = slugify(title)
    #         if Project.objects.filter(slug=slug).exists():
    #             self.slug = get_unique_slug(self.id, title, Project.objects)
    #         else:
    #             self.slug = slug
    #     else:
    #         self.slug = self.slug
    #
    #     super().save(*args, **kwargs)
