import json

from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, View

from rest_framework import status, viewsets
from rest_framework.authentication import (
    BasicAuthentication, SessionAuthentication, TokenAuthentication
)
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from repositories.models import Commit, Repository
from repositories.paginator import CustomPageNumber
from repositories.serializers import (
    CommitSerializer, RepositoryFindSerializer, RepositorySerializer
)
from repositories.services import GitService
from users.serializers import UserSerializer

from .services import GitService


class RepositoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows repositories to be viewed.
    """
    serializer_class = RepositorySerializer
    model = Repository
    authentication_classes = (TokenAuthentication, SessionAuthentication)

    def get_queryset(self):
        return Repository.objects.filter(user = self.request.user)

    @action(detail=True)
    def commits(self, request, pk=None):
        repository = get_object_or_404(Repository, pk = pk)
        queryset = Commit.objects.filter(repository = repository).order_by('-date')
        paginator = CustomPageNumber()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = CommitSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        repository_owner, repository_name = request.data.get('full_name').split('/')
        repository = GitService().get_repository(repository_name, repository_owner, self.request.user)
        if repository:
            new_repository, created = Repository.objects.get_or_create(
                name = repository['name'],
                owner = repository['owner']['login'],
                user = self.request.user,
                defaults={'description': repository['description']}
            )
            if not created:
                return Response({'message': "Repository already exists"}, status=status.HTTP_303_SEE_OTHER)
            webhook_url = request.build_absolute_uri(reverse('webhooklistener'))
            GitService().set_repository_webhook(new_repository.name, new_repository.owner, self.request.user, webhook_url)
            serialized_repository = RepositorySerializer(new_repository, context={'request': request})
            self.save_commits(repository=new_repository)
            return Response(serialized_repository.data, status=status.HTTP_201_CREATED)
        return Response({'message': "Repository not found"}, status=repository.status_code)
    
    def save_commits(self, repository):
        repository_commits = GitService().get_repository_commits(repository.name, repository.owner, self.request.user)
        if repository_commits: 
            with transaction.atomic():
                for commit in repository_commits:
                    Commit.objects.get_or_create(
                        repository = repository,
                        sha = commit['sha'], 
                        defaults={'author': commit['author'], 'message': commit['message'], 'date': commit['date']}
                    )


class CommitViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows commits to be viewed.
    """
    serializer_class = CommitSerializer
    model = Commit
    authentication_classes = (TokenAuthentication, )

    def get_queryset(self):
        return Commit.objects.filter(repository__user = self.request.user).order_by('-date')

class UsersRepositoryList(ListView):
    def get(self, request):
        saved_repositories = Repository.objects.filter(user = self.request.user).values_list('name', flat=True)
        response = GitService().get_user_repositories(self.request.user)
        if response:
            response = [repository for repository in response if repository['name'] not in saved_repositories]
            return JsonResponse(response, status=status.HTTP_200_OK, safe=False)
        return JsonResponse(None, status=response.status_code, safe=False)

@method_decorator(csrf_exempt, name='dispatch')
class GithubHookListener(View):
    def post(self, request, format=None):
        if request.META.get('HTTP_X_GITHUB_DELIVERY'):
            if request.META.get('HTTP_X_GITHUB_EVENT') == "push":
                received_data = json.loads(request.body)

                repository_name = received_data['repository']['name']
                repository_owner = received_data['repository']['owner']['login']
                repository = Repository.objects.filter(name=repository_name, owner=repository_owner).first()
                if repository:
                    for commit in received_data['commits']:
                            Commit.objects.get_or_create(
                                repository = repository,
                                sha = commit['id'],
                                defaults={'author': commit['author']['username'], 'message': commit['message'], 'date': commit['timestamp']}
                            )
                    return HttpResponse(status=200)
            if request.META.get('HTTP_X_GITHUB_EVENT') == "ping":
                return HttpResponse(status=200)
        return HttpResponse(status=403)