from http import cookies

from django.http import HttpResponse
from django.shortcuts import render  # noqa
from django.shortcuts import redirect
from django.views.generic import TemplateView, View

from rest_framework import viewsets
from rest_framework.authtoken.models import Token

from users.models import User
from users.serializers import UserSerializer


class LoginView(TemplateView):
    template_name = "registration/login.html"

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("home")
        return super(LoginView, self).get(request, *args, **kwargs)

class HomeView(View):

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect("login")
        
        token, created = Token.objects.get_or_create(user=request.user)
        response = render(request, 'repositories/index.html')
        response.set_cookie(key='rfeedtoken', value = token.key)
        return response


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
