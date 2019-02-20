from rest_framework import serializers
from .models import Repository, Commit
from users.models import User

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = '__all__'

class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = '__all__'

class RepositoryFindSerializer(serializers.Serializer):
    repository = serializers.CharField(max_length=100)
    owner = serializers.CharField(max_length=50)