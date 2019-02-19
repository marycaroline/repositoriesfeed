from django.shortcuts import get_object_or_404, render
from django.db import transaction

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

    def perform_create(self, serializer):
        repository = serializer.save()
        access_token = self.request.user.social_auth.get(provider ='github').extra_data['access_token']
        repository_commits = GitService().get_repository_commits(repository.name, repository.owner, access_token)
        if repository_commits: 
            with transaction.atomic():
                Commit.objects.bulk_create([
                    Commit(
                        sha = commit['sha'],
                        author = commit['author'],
                        message = commit['message'],
                        repository = repository,
                        date = commit['date']
                    )
                    for commit in repository_commits
                ])


class CommitViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows commits to be viewed.
    """
    serializer_class = CommitSerializer
    model = Commit

    def get_queryset(self):
        return Commit.objects.filter(repository__user = self.request.user)
