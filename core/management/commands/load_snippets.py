from django.core.management.base import BaseCommand
from mimesis import Person, Text, Internet
from core.models import Snippet, User
from random import choice


class Command(BaseCommand):
    help = "load fake snippets and users dynamically."

    def add_arguments(self, parser):
        # parser.add_argument('sample', nargs='+')
        pass

    def handle(self, *args, **options):
        # raise NotImplementedError()
        Snippet.objects.all().delete()
        users = []
        person = Person()
        for _ in range(40):
            User.objects.create(password=person.password(),  username=person.username(
            ), first_name=person.name(), last_name=person.last_name(), email=person.email())

        text = Text()
        internet = Internet()
        users = User.objects.all()
        for _ in range(30):
            title = text.title()
            if not Snippet.objects.filter(title=title).exists():
                Snippet.objects.create(author=choice(
                    users), content=text.text(), title=text.sentence, url=internet.home_page(), )
