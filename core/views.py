from django.shortcuts import render
from core.models import Snippet


def index(request):
    snippets = Snippet.objects.all()
    return render(request, 'index.html', {'snippets': snippets,
                                          })


