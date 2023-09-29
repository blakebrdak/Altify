from django.urls import path
from . import views

app_name = "climate"
urlpatterns = [
    path('', views.index, name='index'),
    path('settings/', views.settings, name='settings'),
    path('get_url/', views.get_url, name='get_url'),
    path('get_settings/', views.get_settings, name='get_settings'),
]
