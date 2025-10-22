from django.apps import AppConfig
from django.contrib import admin
from django.contrib.auth import get_user_model


class NewsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "news"


"""
    def ready(self):
        User = get_user_model()
        model_admin = admin.site._registry.get(User)
        if model_admin:
            model_admin.model._meta.app_label = "auth"
"""
