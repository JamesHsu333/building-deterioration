from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json

from .models import deterioration

# Create your views here.


def index(request):
    return render(request, 'index.html')

def building(request):
    response = {}
    response['list'] = json.loads(serializers.serialize("json", deterioration.objects.all()))
    return (JsonResponse(response))


# todo_list = todo.objects.filter(user=request.user).order_by('-date_added')
# @login_required
# from django.contrib.auth.decorators import login_required
