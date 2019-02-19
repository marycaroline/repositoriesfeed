from django.shortcuts import get_object_or_404, render

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from repositories.models import Commit, Repository
from repositories.serializers import CommitSerializer, RepositorySerializer
from users.serializers import UserSerializer

from .services import GitService


class RepositoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows repositories to be viewed.
    """
    serializer_class = RepositorySerializer
    model = Repository

    def get_queryset(self):
        return Repository.objects.filter(user = self.request.user)

    @action(detail=True)
    def commits(self, request, pk=None):
        repository = get_object_or_404(Repository, pk = pk)
        commits_data = Commit.objects.filter(repository = repository)
        serializer = CommitSerializer(commits_data, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        repository = super(RepositoryViewSet, self).create(request, *args, **kwargs)
        repository_commits = GitService.get_repository_commits(repository.name, repository.owner)
        return repository


class CommitViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows commits to be viewed.
    """
    serializer_class = CommitSerializer
    model = Commit

    def get_queryset(self):
        return Commit.objects.filter(repository__user = self.request.user)
