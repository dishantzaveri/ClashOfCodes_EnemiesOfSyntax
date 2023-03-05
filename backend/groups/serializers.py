from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer


class CommunitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Community
        fields = '__all__'


class CommunityUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    community = CommunitySerializer(read_only=True)
    id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CommunityUser
        fields = ['id', 'user', 'community']  

class CommunityUserListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    community = CommunitySerializer(read_only=True)

    class Meta:
        model = CommunityUser
        fields = ['id', 'user', 'community']