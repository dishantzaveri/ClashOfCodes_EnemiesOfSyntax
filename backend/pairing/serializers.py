from rest_framework import serializers
from .models import *

class TripDetailSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    class Meta:
        model = TripDetail
        fields = ['id', 'user', 'origin_loc', 'destination', 'start_date', 'end_date', 'transport', 'company', 'trip_type', 'budget', 'cluster']

    def create(self, validated_data, user):
        TripDetail.objects.create(user = user, **validated_data)
        return validated_data


class UserDetailSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    class Meta:
        model = UserDetail
        fields = ['user', 'food_pref', 'dob', 'sex']

    def create(self, validated_data, user):
        UserDetail.objects.create(user = user, **validated_data)
        return validated_data


class TripDetailClusterSerializer(serializers.ModelSerializer):

    class Meta:
        model = TripDetail
        fields = '__all__'