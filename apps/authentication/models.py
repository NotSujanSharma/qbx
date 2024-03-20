# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    #first name, lastname,dob,passportnumber,passport issue date,passport expiry date, address
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    dob = models.DateField( null=True, blank=True)
    passport_number = models.CharField(max_length=100, null=True, blank=True)
    passport_issue_date = models.DateField( null=True, blank=True)
    passport_expiry_date = models.DateField( null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True) 
    phone = models.CharField(max_length=100, null=True, blank=True)

    highest_degree = models.CharField(max_length=100, null=True, blank=True)
    bachelors_gpa = models.CharField(max_length=100, null=True, blank=True)
    bachelors_passed_year = models.CharField(max_length=100, null=True, blank=True)
    slc_gpa = models.CharField(max_length=100, null=True, blank=True)
    slc_passed_year = models.CharField(max_length=100, null=True, blank=True)
    see_gpa = models.CharField(max_length=100, null=True, blank=True)
    see_passed_year = models.CharField(max_length=100, null=True, blank=True)

    transcript = models.FileField(upload_to='transcript/', null=True, blank=True)
    ielts_pte = models.FileField(upload_to='ielts_pte/', null=True, blank=True)
    passport = models.FileField(upload_to='passport/', null=True, blank=True)
    other_documents = models.FileField(upload_to='other_documents/', null=True, blank=True)

    def __str__(self):
        return self.username
