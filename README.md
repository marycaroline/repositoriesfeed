# Repositories Feed

## About
This is a simple project built with Vinta's django+react [boilerplate](https://github.com/vintasoftware/django-react-boilerplate) as part of a job application proccess and it consists of a web application where users can track commits made to repositories they chose to monitor. 

## Millestones
- Login using Github - OAuth
- Search for existing repository (and choose to follow its activities?)
- Capture last month commits
- Save repository main data
- List all commits
- Repository Detail page (with all its commits)
- Monitor followed repositories for new commits and saves them.

## Running
### Setup
- On project root, do the following:
- Create a copy of ``repositoriesfeed/settings/local.py.example``:  
  `cp repositoriesfeed/settings/local.py.example repositoriesfeed/settings/local.py` (remembering you should replace `repositoriesfeed` with your project's name!).
- Create a copy of ``.env.example``:  
  `cp .env.example .env`
- Create the migrations for `users` app (do this, then remove this line from the README):  
  `python manage.py makemigrations`
- Run the migrations:  
  `python manage.py migrate`

### Tools
- Setup [editorconfig](http://editorconfig.org/), [prospector](https://prospector.landscape.io/en/master/) and [ESLint](http://eslint.org/) in the text editor you will use to develop.

### Running the project
- Open a command line window and go to the project's directory.
- `pipenv install --dev`
- `npm install`
- `npm run start`
- Open another command line window and go to the project's directory.
- `pipenv shell`
- `python manage.py runserver`

#### Celery
- Open a command line window and go to the project's directory
- `pipenv shell`
- `python manage.py celery`

### Testing
`make test`

Will run django tests using `--keepdb` and `--parallel`. You may pass a path to the desired test module in the make command. E.g.:

`make test someapp.tests.test_views`

### Adding new pypi libs
Just run `pipenv install LIB_NAME_ON_PYPI` and then `pipenv lock` to lock the version in Pipfile.lock file

## Linting
- Manually with `prospector` and `npm run lint` on project root.
- During development with an editor compatible with prospector and ESLint.

## Pre-commit hooks
- Run `pre-commit install` to enable the hook into your git repo. The hook will run automatically for each commit.
- Run `git commit -m "Your message" -n` to skip the hook if you need.

