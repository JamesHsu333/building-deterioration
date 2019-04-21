from django.db import models

# Create your models here.
class building(models.Model):
    # building details
    owner = models.CharField(max_length=64)
    building_name = models.CharField(max_length=64)
    building_index = models.IntegerField()
    building_photo = models.FileField(upload_to='building_photo/')
    De_name = models.CharField(max_length=64)
    De_index = models.IntegerField()
    
class deterioration(models.Model):
    # deterioration details
    owner = models.CharField(max_length=64)
    building_index = models.IntegerField()
    De_index = models.IntegerField()
    De_photo = models.FileField(upload_to='de_photo/')
    degree = models.CharField(max_length=20)
    element = models.CharField(max_length=20)
    space =  models.CharField(max_length=20)
    category =  models.CharField(max_length=20)
    detail_length = models.CharField(default=0, max_length=20)
    detail_width = models.CharField(default=0, max_length=20)
