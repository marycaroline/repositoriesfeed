from django.db import models
from users.models import User

# Create your models here.
class Repository(models.Model):
    name = models.CharField(max_length = 100)
    description = models.CharField(blank=True, null=True, max_length = 255)
    owner = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Commit(models.Model):
    sha = models.CharField(max_length = 50)
    author = models.CharField(max_length=50)
    message = models.CharField(max_length = 255)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return self.message

