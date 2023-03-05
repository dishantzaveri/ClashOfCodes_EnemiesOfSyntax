from django.shortcuts import render
from .serializers import *
from .models import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from rest_framework.generics import GenericAPIView, ListAPIView

# Create your views here.
class CommunityPostAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommunitySerializer

    def post(self, request):
        user = User.objects.get(email = request.user.email)
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            community = serializer.create(serializer.validated_data)
            communityuser_obj = CommunityUser.objects.create(user = user, community = community)
            return JsonResponse({"message": "success", "data": request.data}, status= status.HTTP_201_CREATED)
        else:
            return JsonResponse({"message":"data not valid"}, status=status.HTTP_400_BAD_REQUEST)

    
class CommunityListAPI(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()


class CommunityUserPostAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommunityUserSerializer

    def post(self, request):
        user = User.objects.get(email = request.user.email)
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            community = Community.objects.get(id=request.data['id'])
            communityuser, created = CommunityUser.objects.get_or_create(user = user, community=community)
            if created:
                return JsonResponse({"message": "success", "user": communityuser.user.email, "community":communityuser.community.location}, status= status.HTTP_201_CREATED)
            else: 
                return JsonResponse({"message":"User is already a part of the community"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({"message":"data not valid"}, status=status.HTTP_400_BAD_REQUEST)


class CommunityUserListAPI(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CommunityUserListSerializer

    def get_queryset(self):
        id=self.kwargs.get('id')
        community = Community.objects.get(id=id)
        queryset = CommunityUser.objects.filter(community=community)
        return queryset