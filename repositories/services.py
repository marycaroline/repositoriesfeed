from datetime import datetime, timedelta

import requests


class GitService:
    url = 'https://api.github.com/repos/'

    def get_headers(self, token):
        return {
            'content-type': 'application/json; charset=utf-8',
            'authorization': f'token {token}'
        }

    def get_repository(self, repository, token): 
        owner, repository_name = repository.split('/')
        repo_request = requests.get(f'{url}/{owner}/{repository_name}', header = get_headers())
        return repo_request.json

    def get_repository_commits(self, repository):
        payload = {'since': datetime.today() - datetime.timedelta(days - 30)}
        commits_request = requests.get(f'{url}/repos/{repository}/commits', header = get_headers(), params = payload)
        return commits_request