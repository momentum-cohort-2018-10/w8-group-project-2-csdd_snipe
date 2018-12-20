from django.shortcuts import render
from core.models import Snippet, User
from api.serializers import SnippetSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.


class SnippetListCreateView(generics.ListCreateAPIView):
    serializer_class = SnippetSerializer
    queryset = Snippet.objects.all()
    filter_backends = (DjangoFilterBackend,)


class MySnippetListCreateView(generics.ListCreateAPIView):
    serializer_class = SnippetSerializer

    def get_queryset(self):
        return self.request.user.snippets

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class SnippetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SnippetSerializer
    lookup_field = "pk"
    # queryset = Snippet.objects.all()

    def get_queryset(self):
        return self.request.user.snippets


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = (DjangoFilterBackend,)
