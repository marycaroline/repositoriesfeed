from django.shortcuts import render  # noqa

from rest_framework import viewsets
from django.shortcuts import redirect
from django.views.generic import TemplateView
from users.models import User
from users.serializers import UserSerializer


class LoginView(TemplateView):
    template_name = "registration/login.html"

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("/home")
        return super(LoginView, self).get(request, *args, **kwargs)



class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
