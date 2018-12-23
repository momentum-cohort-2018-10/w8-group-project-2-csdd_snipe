from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(max_length=255)


class Snippet(models.Model):

    title = models.CharField(max_length=250)

    author = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="snippets"
    )
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    language = models.CharField(max_length=100)

    is_copy = models.BooleanField(default="False")

    class Meta:
        ordering = ('created_at',)
