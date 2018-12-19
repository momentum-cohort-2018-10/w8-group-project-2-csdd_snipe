from django.urls import path
from api import views as api_views


urlpatterns = [
    path("snippets/", api_views.SnippetListCreateView.as_view(),
         name="api_snippets_list"),
    path(
        "snippets/<pk>/",
        api_views.SnippetRetrieveUpdateDestroyView.as_view(),
        name="api_snippet",
    ),
]
