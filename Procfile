web: gunicorn repositoriesfeed.wsgi --limit-request-line 8188 --log-file -
worker: celery worker --app=repositoriesfeed --loglevel=info
