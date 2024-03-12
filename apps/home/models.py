# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class SubUser(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default="India")
    status = models.CharField(max_length=100, default="Active")
    visaType = models.CharField(max_length=100, default="Tourist")

    # profile_pic = models.ImageField(upload_to='profile_pics', blank=True)

    def __str__(self):
        return self.username