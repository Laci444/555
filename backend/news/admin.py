from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Article, Profile


class ProfileAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets
    personal_info_section = fieldsets[1][1]
    personal_info_section["fields"] += ("bio", "profile_image")


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Article)
