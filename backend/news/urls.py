from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ArticleViewSet, AuthorViewSet

router = DefaultRouter()
router.register("authors", AuthorViewSet, basename="author")
router.register("articles", ArticleViewSet, basename="article")

urlpatterns = [
    path("", include(router.urls)),
    path("editor-js/", include("editor_js.urls")),
]
