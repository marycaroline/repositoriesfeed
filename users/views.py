from django.shortcuts import render  # noqa

from rest_framework import viewsets
from users.models import User
from users.serializers import UserSerializer


# Create your views here.
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by()
    serializer_class = UserSerializer
