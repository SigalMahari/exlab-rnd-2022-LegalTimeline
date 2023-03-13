from django.db import models


# Create your models here.
class Case(models.Model):
    id = models.AutoField(primary_key=True)
    case_number = models.CharField(max_length=100)
    creation_date = models.DateTimeField(auto_now_add=False)
    last_discussion = models.DateTimeField(auto_now_add=False)
    prosecutor = models.CharField(max_length=100)
    defendant = models.CharField(max_length=100)
    defense = models.CharField(max_length=100)
    case_description = models.CharField(max_length=1000)
    tags = models.CharField(max_length=100)
    # def __str__(self):
    #     return '%s: %s' % (self.name, self.survey)


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=False)
    hour = models.TimeField(auto_now_add=False)
    category = models.CharField(max_length=100)
    new_category = models.CharField(max_length=100)
    case_description = models.CharField(max_length=1000)
    tags = models.CharField(max_length=100)
    icon = models.ImageField()
    document = models.FileField()
    case_number = models.PositiveIntegerField()
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    mail = models.CharField(max_length=100)


class Document(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    upload_date = models.DateTimeField(auto_now_add=False)
    event = models.PositiveIntegerField()
    path = models.CharField(max_length=500)
