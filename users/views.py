from http import cookies

from django.http import HttpResponse
from django.shortcuts import render  # noqa
from django.shortcuts import redirect
from django.contrib.auth import logout
from django.views.generic import TemplateView, View

from rest_framework import viewsets
from rest_framework.authtoken.models import Token

from users.models import User
from users.serializers import UserSerializer


class HomeView(View):
    def get(self, request, *args, **kwargs):
        response = render(request, 'repositories/index.html')
        if request.user.is_authenticated:
            token, created = Token.objects.get_or_create(user=request.user)
            response.set_cookie(key='rfeedtoken', value = token.key)
            return response
        response.delete_cookie('rfeedtoken')
        return response

class LogoutView(View):
    def post(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse(status=200)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
