from rest_framework import serializers

from .models import Article, Profile


class ProfileListSerializer(serializers.HyperlinkedModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ("id", "url", "full_name", "profile_image")
        extra_kwargs = {"url": {"view_name": "author-detail"}}

    def get_full_name(self, obj):
        return obj.get_full_name()


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "full_name",
            "profile_image",
            "email",
            "bio",
        ]

    def get_full_name(self, obj):
        return obj.get_full_name()


class ArticleListSerializer(serializers.HyperlinkedModelSerializer):
    author = ProfileListSerializer(read_only=True)
    id = serializers.CharField(source="public_id", read_only=True)

    class Meta:
        model = Article
        fields = ["id", "url", "title", "summary", "author", "created_at"]
        extra_kwargs = {
            "url": {"view_name": "article-detail", "lookup_field": "public_id"},
        }


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    author = ProfileListSerializer(read_only=True)
    id = serializers.CharField(source="public_id", read_only=True)

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "summary",
            "content",
            "created_at",
            "updated_at",
            "author",
            "visible",
        ]
        extra_kwargs = {
            "visible": {"write_only": True},
        }
