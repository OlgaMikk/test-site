from typing import Optional

from rest_framework import serializers

from .models import (
    Advantage,
    BuildingProgress,
    BuildingProgressImage,
    City,
    EstateObject,
    Geotag,
    Icon,
    Image,
    Location,
    Project,
    Route,
    TextBlock,
)


class IconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icon
        fields = "__all__"


class AdvantageSerializer(serializers.ModelSerializer):
    icon = IconSerializer()

    class Meta:
        model = Advantage
        fields = "__all__"


class EstateObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstateObject
        fields = (
            "id",
            "title",
            "corps",
            "area_min",
            "area_max",
            "floor_count",
            "room_count",
            # "floor_max",
            # "floor_min",
            # "price_max",
            # "price_min",
            # "square_min",
            # "square_max",
            # "rooms_count",
            # "rooms_max",
            # "rooms_min",
        )


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("id", "image")


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ("id", "title", "slug")


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = "__all__"


class LocationSerializer(serializers.ModelSerializer):
    routes = RouteSerializer(many=True)

    class Meta:
        model = Location
        fields = "__all__"


class TextBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextBlock
        fields = "__all__"


class GeotagSerializer(serializers.ModelSerializer):
    icon = IconSerializer()

    class Meta:
        model = Geotag
        fields = "__all__"


class BuildingProgressImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingProgressImage
        fields = "__all__"


class BuildingProgressSerializer(serializers.ModelSerializer):
    images = BuildingProgressImageSerializer(many=True)

    class Meta:
        model = BuildingProgress
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    estate_objects = EstateObjectSerializer(many=True)
    images = ImageSerializer(many=True)
    featured_advantages = AdvantageSerializer(many=True)
    advantages = AdvantageSerializer(many=True)
    catalog_btn_link = serializers.SerializerMethodField(read_only=True)
    location = LocationSerializer()
    city = CitySerializer()
    text_blocks = TextBlockSerializer(many=True)
    geotags = GeotagSerializer(many=True)
    building_progresses = BuildingProgressSerializer(many=True)

    class Meta:
        model = Project
        fields = (
            "id",
            "slug",
            "title",
            "logo",
            "icon",
            "image",
            "short_description",
            "short_description_image",
            "featured_advantages",
            "advantages",
            "description",
            "housing_description",
            "catalog_btn_link",
            "address",
            "longitude",
            "latitude",
            "type",
            "location",
            "is_published",
            "estate_objects",
            "building_progresses",
            "images",
            "city",
            "geotags",
            "text_blocks",
            "video_url",
            "tour_3d_url",
        )

    def get_catalog_btn_link(self, obj) -> Optional[str]:
        return obj.catalog_btn_link if obj.is_catalog_btn_enable else None
