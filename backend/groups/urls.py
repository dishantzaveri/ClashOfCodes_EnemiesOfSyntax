from django.urls import path
from . import views

urlpatterns = [
    path('community-post/', views.CommunityPostAPI.as_view(), name = 'community-post'),
    path('community-list/', views.CommunityListAPI.as_view(), name = 'community-list'),
    path('join-community/', views.CommunityUserPostAPI.as_view(), name = 'communityuser-post'),
    path('community-users/<int:id>', views.CommunityUserListAPI.as_view(), name = 'communityuser-list'),
]