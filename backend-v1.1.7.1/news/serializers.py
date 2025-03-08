from rest_framework import serializers

from news.models import ArticleBlock, Author, News, Rating


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class ArticleBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleBlock
        fields = "__all__"


class NewsListSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()

    def get_cover_image(self, obj) -> str:
        request = self.context.get("request")
        cover_image = obj.article_blocks.first()
        cover_image_serializer = ArticleBlockSerializer(instance=cover_image, context={"request": request})
        cover_image_uri = cover_image_serializer.data["image"]
        return cover_image_uri

    class Meta:
        model = News
        fields = ("id", "slug", "title", "cover_image", "publication_date", "category", "project", "author", "order")


class NewsRetrieveSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    article_blocks = ArticleBlockSerializer(many=True, read_only=True)

    def get_cover_image(self, obj) -> str:
        request = self.context.get("request")
        cover_image = obj.article_blocks.first()
        cover_image_serializer = ArticleBlockSerializer(instance=cover_image, context={"request": request})
        cover_image_uri = cover_image_serializer.data["image"]
        return cover_image_uri

    def get_rating(self, obj) -> float:
        if obj.rating:
            return obj.rating
        return obj.user_rating

    class Meta:
        model = News
        fields = (
            "id",
            "slug",
            "title",
            "cover_image",
            "publication_date",
            "category",
            "project",
            "author",
            "order",
            "article_blocks",
            "rating",
        )


class NewsYearSerializer(serializers.Serializer):
    year = serializers.IntegerField()


class RatingSerializer(serializers.ModelSerializer):

    def validate_score(self, score):
        if score < 0 or score > 5:
            raise serializers.ValidationError("Оценка может быть от 0 до 5.")
        return score

    class Meta:
        model = Rating
        fields = ("score",)
