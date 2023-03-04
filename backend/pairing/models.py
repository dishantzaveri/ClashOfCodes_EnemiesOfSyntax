from django.db import models
from accounts.models import User


class TripDetail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    origin_loc = models.CharField(max_length=100, blank=True)
    destination = models.CharField(max_length=100, blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    transport = models.CharField(max_length=50, blank = True)
    company = models.CharField(max_length=50, blank=True)
    trip_type = models.CharField(max_length=100, blank=True)
    budget = models.IntegerField(blank=True, null=True)


class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    food_pref = models.CharField(max_length = 20, blank=True)
    dob = models.DateField(blank=True, null=True)
    sex = models.CharField(max_length = 10, blank=True)