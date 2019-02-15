from django.db import models
from users.models import User

# Create your models here.
class Repository(models.Model):
    name = models.CharField(max_length = 100)
    description = models.CharField(blank=True, null=True, max_length = 250)
    owner = models.ForeignKey('GithubUser', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class GithubUser(models.Model):
    name = models.CharField(max_length = 50)
    email = models.EmailField()

class Commit(models.Model):
    sha = models.CharField(max_length = 50)
    author = models.ForeignKey(GithubUser, on_delete=models.CASCADE)
    message = models.CharField(max_length = 100)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    date = models.DateTimeField()

