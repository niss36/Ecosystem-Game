from django.urls import path

from . import views

urlpatterns = [
    path('new', views.new, name='new'),
    path('<guid>/update', views.update, name='update'),
]