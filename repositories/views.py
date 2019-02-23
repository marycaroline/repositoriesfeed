from django.db import transaction
from django.shortcuts import get_object_or_404, render

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView

from repositories.models import Commit, Repository
from repositories.serializers import CommitSerializer, RepositorySerializer, RepositoryFindSerializer
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
        commits_data = Commit.objects.filter(repository = repository)
        serializer = CommitSerializer(commits_data, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        repository_name = request.data.get('name')
        repository_owner = request.data.get('owner')
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
            serialized_repository = RepositorySerializer(new_repository, context={'request': request})
            self.save_commits(repository=new_repository)
            return Response(serialized_repository.data, status=status.HTTP_201_CREATED)
        return Response({'message': "Repository not found"}, status=status.HTTP_404_NOT_FOUND)

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
