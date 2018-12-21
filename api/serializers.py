from rest_framework import serializers
from core.models import Snippet, User


class CreatableSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            value, _ = self.get_queryset().get_or_create(
                **{self.slug_field: data})
            return value
        except (TypeError, ValueError):
            self.fail("invalid")


class SnippetSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        slug_field="username", read_only=True)
    author_email = serializers.CharField(
        source="author.email", read_only=True)
    content = serializers.CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    language = serializers.CharField(max_length=40, allow_blank=False)
    title = serializers.CharField(allow_blank=True)
    queryset = Snippet.objects.all()

    class Meta:
        model = Snippet
        fields = ("author", "author_email", "content",
                  "language", "title", "pk", )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email")
