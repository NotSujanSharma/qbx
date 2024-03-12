# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from .models import SubUser
from django.views.decorators.csrf import csrf_exempt
import json


@login_required(login_url="/login/")
def index(request):
    context = {'segment': 'index'}

    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))

@csrf_exempt
@login_required(login_url="/login/")
def create_sub_user(request):
    if request.method == 'POST':
        try: 

            username = request.POST['username']
            name = request.POST['name']
            email = request.POST['email']
            phone = request.POST['phone']
            password = request.POST['password']
            address = request.POST['address']
            country = request.POST['country']
            visaType = request.POST['visaType']
            status = request.POST['status']
            user = SubUser(username=username, name=name, email=email, phone=phone, password=password, address=address, country=country, visaType=visaType, status=status)
            user.save()

            return HttpResponse(json.dumps({"message": "successful"}), content_type='application/json')
        
        except Exception as e:
            print(e)
            return HttpResponse("failed")

        

@csrf_exempt
@login_required(login_url="/login/")
def get_sub_user(request):
    if request.method == 'GET':
        try: 
            users_list = []
            users = SubUser.objects.all()
            for user in users:
                this_user = {
                    "username": user.username,
                    "name": user.name,
                    "email": user.email,
                    "visaType": user.visaType,
                    "phone": user.phone,
                    "address": user.address,
                    "status": user.status
                    
                }
                users_list.append(this_user)

            return HttpResponse(json.dumps(users_list), content_type='application/json')
        
        except Exception as e:
            print(e)
            return HttpResponse("failed")


@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context['segment'] = load_template

        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))
