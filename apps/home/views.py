# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.urls import reverse
# from .models import SubUser
from apps.authentication.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from .getdata import get_uni_data, get_filtered_data

def index(request):
    context = {'segment': 'Home'}
    if request.user.is_authenticated:

        logged_in = True
    else:
        logged_in= False
    
    context['logged_in'] = logged_in


    html_template = loader.get_template('landing/index.html')
    return HttpResponse(html_template.render(context, request))

def contact(request):
    context = {'segment': 'Contact'}
    if request.user.is_authenticated:

        logged_in = True
    else:
        logged_in= False
    
    context['logged_in'] = logged_in

    html_template = loader.get_template('landing/contact.html')
    return HttpResponse(html_template.render(context, request))

@login_required(login_url="/login/")
def profile(request):
    context = {'segment': 'Profile'}

    html_template = loader.get_template('home/profile.html')
    return HttpResponse(html_template.render(context, request))

@login_required(login_url="/login/")
def programs(request):
    context = {'segment': 'Programs'}
    html_template = loader.get_template('home/programs.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def chat(request):
    context = {'segment': 'Chat'}

    html_template = loader.get_template('home/chat.html')
    return HttpResponse(html_template.render(context, request))

@login_required(login_url="/login/")
def account(request):
    context = {'segment': 'Dashboard'}

    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))

@csrf_exempt
@login_required(login_url="/login/")
def application(request):
    context = {'segment': 'Application'}
    context = {'programId': request.GET['programId']}


    html_template = loader.get_template('home/application.html')
    return HttpResponse(html_template.render(context, request))


@csrf_exempt
@login_required(login_url="/login/")
def get_data(request):
    if request.method == 'GET':
        try: 
            
            page = request.GET['page']
            data = get_uni_data(page)
            return HttpResponse(json.dumps(data), content_type='application/json')
        
        except Exception as e:
            print(e)
            return HttpResponse("failed")

@csrf_exempt
@login_required(login_url="/login/")
def test(request, page):
    if request.method == 'GET':
        try:
            data = get_filtered_data(page)

            return HttpResponse(json.dumps(data), content_type='application/json')
        
        except Exception as e:
            print(e)
            return HttpResponse("failed")

@login_required(login_url="/login/")
def map(request):
    context = {'segment': 'map'}

    html_template = loader.get_template('home/map.html')
    return HttpResponse(html_template.render(context, request))

@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        
        else:
            html_template = loader.get_template( 'home/page-404.html' )
            return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def update_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.get(username=request.user)
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            user.email = data['email']
            user.address = data['address']
            
            user.save()
            return HttpResponse("success")
        except Exception as e:
            print(e)
            return HttpResponse("failed")
    else:
        return HttpResponse("failed")