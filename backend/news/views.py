from rest_framework import permissions, viewsets

from .models import Article, Profile
from .permissions import CanCreateArticle, CanViewHiddenArticles, IsAuthorOrReadOnly
from .serializers import (
    ArticleListSerializer,
    ArticleSerializer,
    ProfileListSerializer,
    ProfileSerializer,
)


class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    lookup_field = "username"

    def get_queryset(self):
        return Profile.objects.filter(user_permissions__codename="is_public")

    def get_serializer_class(self):
        if self.action == "list":
            return ProfileListSerializer
        return ProfileSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = "public_id"
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly,
        CanCreateArticle,
        CanViewHiddenArticles,
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_serializer_class(self):
        if self.action == "list":
            return ArticleListSerializer
        return ArticleSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user

        if user.has_perm("news.add_article"):
            return qs

        return qs.filter(visible=True)
