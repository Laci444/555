from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django_editorjs import EditorJsField
from hashids import Hashids


def get_hashids():
    return Hashids(settings.HASHIDS_SALT, settings.HASHIDS_MIN_LENGTH)


def get_user_profile_image_path(instance, filename):
    return f"profiles/{instance.id}/{filename}"


class Profile(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    profile_image = models.ImageField(
        upload_to=get_user_profile_image_path, blank=True, null=True
    )

    def __str__(self):
        return self.username

    class Meta:
        app_label = "auth"
        permissions = [("is_public", "Publicly accessible")]


class Article(models.Model):
    public_id = models.CharField(max_length=10, unique=True, editable=False)

    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=500)
    content = EditorJsField()
    visible = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="articles"
    )

    def save(self, *args, **kwargs):
        creating = self._state.adding
        super().save(*args, **kwargs)

        if creating and not self.public_id:
            hashids = get_hashids()
            self.public_id = hashids.encode(self.pk)
            Article.objects.filter(pk=self.pk).update(public_id=self.public_id)

    def __str__(self):
        return self.title
