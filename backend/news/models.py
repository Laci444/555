from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from hashids import Hashids


def get_hashids():
    return Hashids(settings.HASHIDS_SALT, settings.HASHIDS_MIN_LENGTH)


class Profile(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    profile_image = models.CharField(max_length=5)  # TODO implement image storage

    def __str__(self):
        return self.get_full_name()

    class Meta:
        app_label = "auth"
        permissions = [("is_public", "Publicly accessible")]


class Article(models.Model):
    public_id = models.CharField(max_length=32, unique=True, editable=False)

    title = models.CharField()
    summary = models.CharField(max_length=500)
    content = models.TextField()
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
