from django.urls import path
from api import views as api_views


urlpatterns = [
    path("snippets/", api_views.SnippetListView.as_view(),
         name="api_snippets_list"),
    path("my_snippets/", api_views.MySnippetListCreateView.as_view(),
         name="my_snippets_list"),
    path(
        "snippets/<pk>/",
        api_views.SnippetRetrieveUpdateDestroyView.as_view(),
        name="api_snippet"),
    path("users/", api_views.UserListView.as_view(), name="api_users_list"),

]
