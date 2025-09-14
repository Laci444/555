from rest_framework import permissions


class ReadOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user


class CanCreateArticle(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            return request.user.has_perm("news.add_article")
        return True


class CanViewHiddenArticles(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.visible:
            return True
        return request.user.has_perm("news.add_article")
