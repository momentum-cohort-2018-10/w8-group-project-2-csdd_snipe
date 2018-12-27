from django.shortcuts import render
from core.models import Snippet


def index(request):
    snippets = Snippet.objects.all()
    return render(request, 'index.html', {'snippets': snippets,
                                          })


def snippet_detail(request, pk):

    snippet = Book.objects.get(slug=slug)

    return render(request, 'snips/snip_detail.html', {
        'snippet': snippet,
    })
