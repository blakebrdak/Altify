from django.db import models


class Settings(models.Model):
    name = models.CharField(max_length=100)
    configure1 = models.CharField(max_length=100)
    configure2 = models.CharField(max_length=100)
    configure3 = models.CharField(max_length=100)
    configure4 = models.CharField(max_length=100)
    configure5 = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
