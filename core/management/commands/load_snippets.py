from django.core.management.base import BaseCommand
from mimesis import Person, Text
from core.models import Snippet, User
from random import choice
from snippet.settings import BASE_DIR


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
        users = User.objects.all()

        for _ in range(30):
            language = choice(['python', 'javascript', 'ruby', 'java'])

            if language == "java":
                content = open(BASE_DIR + "/core/fakecode/file.java").read()
            elif language == "python":
                content = open(BASE_DIR + "/core/fakecode/python.py").read()
            elif language == "javascript":
                content = open(
                    BASE_DIR + "/core/fakecode/javascript.js").read()
            else:
                content = open(BASE_DIR + "/core/fakecode/ruby.rb").read()
            title = text.sentence()
            if not Snippet.objects.filter(title=title).exists():
                Snippet.objects.create(author=choice(
                    users), title=title, language=language, content=content)
