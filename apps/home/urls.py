# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views

urlpatterns = [

    # The home page
    path('', views.index, name='home'),
    path('create_usr/', views.create_sub_user, name='create_usr'),
    path('get_usr/', views.get_sub_user, name='get_usr'),
    path('delete_usr/<int:id>/', views.delete_sub_user, name='delete_usr'),

    path('update_usr/', views.update_sub_user, name='update_usr'),

    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

]
