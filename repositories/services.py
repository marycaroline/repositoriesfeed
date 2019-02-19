from datetime import datetime, timedelta

import requests


class GitService:
    URL = 'https://api.github.com'

    def get_headers(self, token):
        return {
            'content-type': 'application/json; charset=utf-8',
            'authorization': f'token {token}'
        }
    
    def get_repository(self, repository, owner, token):
        repo_request = requests.get(f'{self.URL}/repos/{owner}/{repository}', headers = self.get_headers(token))
        if repo_request:
            return repo_request.json()
        return None 

    def get_repository_commits(self, repository, owner, token):
        payload = {'since': datetime.today() - timedelta(days = 30)}
        commits_request = requests.get(f'{self.URL}/repos/{owner}/{repository}/commits', headers = self.get_headers(token), params = payload)
        if commits_request:
            return  [{
            'sha': commit['sha'],
            'author': commit['commit']['author']['name'],
            'message': commit['commit']['message'],
            'date': commit['commit']['author']['date']
            } for commit in commits_request.json()]
        return None
