from rest_framework import serializers
from core.models import Snippet, User


class SnippetSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        slug_field="username", read_only=True)
    content = serializers.CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    language = serializers.CharField(read_only=True)

    class Meta:
        model = Snippet
        fields = ("author", "content", "language", )


class UserSerializer(serializers.ModelSerializer):
    model = User
    fields = ("username",)
