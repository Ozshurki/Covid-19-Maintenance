from django.db import models


# Create your models here.
class Citizens(models.Model):
    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100, null=False)
    birth_date = models.DateField(null=False)
    address = models.CharField(max_length=100, null=False)
    city = models.CharField(max_length=40, null=False)
    zipcode = models.IntegerField(null=True)
    land_line = models.IntegerField(null=False)
    cellular = models.IntegerField(null=False)
    is_infected = models.BooleanField(null=False, default=False)
    conditions = models.TextField(max_length=40, null=False)
