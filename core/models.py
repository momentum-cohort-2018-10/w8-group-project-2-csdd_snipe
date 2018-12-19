from django.db import models
from django.contrib.auth.models import AbstractUser
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles


# Create your models here.


class User(AbstractUser):
    pass


class Snippet(models.Model):

    title = models.CharField(max_length=250)

    author = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="snippets"
    )
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    language = models.CharField(max_length=100)

    class Meta:
        ordering = ('created_at',)
