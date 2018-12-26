"""snippet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.conf.urls import path, include
from django.contrib import admin
from django.urls import path, include
from core import views
from api import views as api_views
import snippet
from django.contrib.auth.views import (
    PasswordChangeView,
    PasswordChangeDoneView,
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)


if snippet.settings.DEBUG:
    import debug_toolbar

urlpatterns = [
    path("", views.index, name="home"),
    path('admin/', admin.site.urls),

    path("api/", include("api.urls")),
    path('__debug__/', include(debug_toolbar.urls)),

    path("users/", api_views.UserListView.as_view(),
         name="api_user_list"),
    path('accounts/password/reset/', PasswordResetView.as_view(
        template_name='registration/password_reset_form.html'), name="password_reset"),
    path('accounts/password/change/', PasswordChangeView.as_view(
        template_name='registration/password_change_form.html'), name="password_change"),
    path('accounts/password/change/done/', PasswordChangeDoneView.as_view(
        template_name='registration/password_change_done.html'), name="password_change_done"),
    path('accounts/password/reset/done/', PasswordResetDoneView.as_view(
        template_name='registration/password_reset_done.html'), name="password_reset_done"),
    path('accounts/password/reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(
        template_name='registration/password_reset_confirm.html'), name="password_reset_confirm"),
    path('accounts/password/done/', PasswordResetCompleteView.as_view(
         template_name='registration/password_reset_complete.html'),
         name="password_reset_complete"),
    path('accounts/', include('registration.backends.simple.urls')),

]
