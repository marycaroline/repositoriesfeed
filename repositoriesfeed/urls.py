from django.conf import settings
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView, RedirectView

import django_js_reverse.views
from rest_framework import routers

# from rest_framework.authtoken import views

from repositories.views import CommitViewSet, RepositoryViewSet, ObtainToken
from users.views import LoginView, UserViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'commits', CommitViewSet, basename = 'commits')
router.register(r'repositories', RepositoryViewSet, basename = 'repositories')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),
    url(r'^$', RedirectView.as_view(url='home')),
    url(r'^home/$', login_required(TemplateView.as_view(template_name='repositories/index.html')), name='home'),
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
    url(r'^token/$', ObtainToken.as_view(), name='token'),
    url(r'^oauth/', include('social_django.urls', namespace='social')),
    url(r'^api/', include(router.urls)),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
