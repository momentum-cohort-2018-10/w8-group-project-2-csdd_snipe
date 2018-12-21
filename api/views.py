from django.shortcuts import render
from core.models import Snippet, User
from api.serializers import SnippetSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import PermissionDenied
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector


class SnippetListView(generics.ListAPIView):
    serializer_class = SnippetSerializer
    filter_backends = (DjangoFilterBackend,)

    def get_queryset(self):
        vector = SearchVector('language', 'content',
                              'title', 'author__username')
        if self.request.GET.get("search"):
            query = self.request.GET.get("search")
            return Snippet.objects.annotate(search=vector).filter(search=query)
        else:
            return Snippet.objects.all()


class MySnippetListCreateView(generics.ListCreateAPIView):
    serializer_class = SnippetSerializer
    def get_queryset(self):
        return self.request.user.snippets

    def perform_create(self, serializer):
        print(request)
        serializer.save(author=self.request.user)
        print(serializer)


class SnippetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SnippetSerializer
    lookup_field = "pk"
    queryset = Snippet.objects.all()

    def check_object_permissions(self, request, snippet):
        if request.method != "GET" and snippet.author != request.user:
            raise PermissionDenied("You are not allowed to that! Sorry!")
        return super().check_object_permissions(request, snippet)


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = (DjangoFilterBackend,)
