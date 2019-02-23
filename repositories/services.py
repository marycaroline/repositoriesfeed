from datetime import datetime, timedelta

import requests


class GitService:
    URL = 'https://api.github.com'

    def get_access_token(self, user):
        return user.social_auth.get(provider ='github').extra_data['access_token']

    def get_headers(self, user):
        token = self.get_access_token(user)
        return {
            'content-type': 'application/json; charset=utf-8',
            'authorization': f'token {token}'
        }
    
    def get_repository(self, repository, owner, user):
        repo_request = requests.get(f'{self.URL}/repos/{owner}/{repository}')
        if repo_request:
            return repo_request.json()
        return None 

    def get_repository_commits(self, repository, owner, user):
        payload = {'since': datetime.today() - timedelta(days = 30)}
        commits_request = requests.get(f'{self.URL}/repos/{owner}/{repository}/commits', params = payload)
        if commits_request:
            return  [{
            'sha': commit['sha'],
            'author': commit['commit']['committer']['name'],
            'message': commit['commit']['message'],
            'date': commit['commit']['author']['date']
            } for commit in commits_request.json()]
        return None
