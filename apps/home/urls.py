# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views

urlpatterns = [

    # The home page
    path('', views.index, name='home'),
    path('contact/', views.contact, name='contact'),
    path('account/', views.account, name='account'),
    path('profile/', views.profile, name='profile'),
    path('map/', views.map, name='map' ),
    path('programs/', views.programs, name='programs'),
    path('chat/', views.chat, name='chat'),
    path('application/', views.application, name='application'),

    path('api/get_data/', views.get_data, name='get_data'),
    # get everything after the first slash
    path("test/<str:page>", views.test, name="test"), 
    path("update_user/", views.update_user, name="update_user"),

    # admin and 404 pages
    re_path(r'^.*\.*', views.pages, name='pages'),

    

]
