from django.shortcuts import render
from core.models import Snippet
# from django.views.generic import TemplateView
# template_name = ".html"


def index(request):
    snippets = Snippet.objects.all()
    return render(request, 'index.html', {'snippets': snippets,
                                          })


def tempIndex(request):
    snippets = Snippet.objects.all()
    return render(request, 'tempindex.html', {'snippets': snippets,
                                              })
# class Home(TemplateView):
#     template_name = "home.html"
