from datetime import datetime
from re import L
from django.db import models


class ToDo(models.Model):
    title = models.CharField(max_length=30)
    isComplete = models.BooleanField(default=False)
    datetime = models.DateTimeField(default=None, blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
