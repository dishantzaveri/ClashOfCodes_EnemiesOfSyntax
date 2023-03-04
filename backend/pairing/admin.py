from django.contrib import admin
from .models import *

# Register your models here.
class TripDetailAdmin(admin.ModelAdmin):
    model = TripDetail
    list_display = ['user', 'origin_loc', 'destination', 'start_date', 'end_date', 'transport', 'company', 'trip_type', 'budget']
    list_filter = ['user', 'origin_loc', 'destination', 'start_date', 'end_date', 'transport', 'company', 'trip_type', 'budget']
    fields = ['user', 'origin_loc', 'destination', 'start_date', 'end_date', 'transport', 'company', 'trip_type', 'budget']

    search_fields = ['user', 'origin_loc', 'destination', 'start_date', 'end_date', 'transport', 'company', 'trip_type', 'budget']
    ordering = ['user', 'origin_loc', 'destination', 'start_date', 'end_date', 'transport', 'company', 'trip_type', 'budget']
    filter_horizontal = ()


class UserDetailAdmin(admin.ModelAdmin):
    model = UserDetail
    list_display = ['user', 'food_pref', 'dob', 'sex']
    list_filter = ['user', 'food_pref', 'dob', 'sex']
    fields = ['user', 'food_pref', 'dob', 'sex']

    search_fields = ['user', 'food_pref', 'dob', 'sex']
    ordering = ['user', 'food_pref', 'dob', 'sex']
    filter_horizontal = ()

admin.site.register(TripDetail, TripDetailAdmin)
admin.site.register(UserDetail, UserDetailAdmin)