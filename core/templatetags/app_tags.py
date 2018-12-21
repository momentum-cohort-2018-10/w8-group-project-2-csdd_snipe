import hashlib
from hashlib import md5
import urllib
from django import template
from django.utils.safestring import mark_safe
 
register = template.Library()

@register.filter(name='gravatar')
def gravatar(user, size=35):
    email = str(user.email.strip().lower()).encode('utf-8')
    email_hash = md5(email).hexdigest()
    url = "//www.gravatar.com/avatar/{0}?s={1}&d=wavatar&r=PG"
    return url.format(email_hash, size)