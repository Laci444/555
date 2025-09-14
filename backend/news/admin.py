from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Article, Profile

admin.site.register(Profile, UserAdmin)
admin.site.register(Article)
