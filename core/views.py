from django.shortcuts import render
from core.models import Snippet
# Create your views here.


def index(request):
    return render(request, 'index.html')
