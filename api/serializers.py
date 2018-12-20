from rest_framework import serializers
from core.models import Snippet, User


class SnippetSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        slug_field="username", read_only=True)
    content = serializers.CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    language = serializers.CharField(max_length=40, allow_blank=False)
    title = serializers.CharField(allow_blank=True)
    queryset = Snippet.objects.all()

    class Meta:
        model = Snippet
        fields = ("author", "content", "language", "title", "pk", )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username",)
