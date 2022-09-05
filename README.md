# Simple To Do list 
A simple project to simulate how django graphql and react works. 
Contain main folder back and front. Back for backend using django and front for frontend using react.

## Requirements 
- python 3.8
- pip
- npm 14
- yarn
- [django](https://docs.djangoproject.com/en/3.2/)
- [nextjs](https://nextjs.org/docs/getting-started)

## Installation
This is installation for each folder.

### Back
1. use `pip install -r requirements.txt`
1. run migrations `python manage.py migrate`
1. run it `python manage.py runserver`

### Front
1. install using `yarn`
1. run it `npm run dev`

### how to use
To access the application use `localhost:3000` for main application and `localhost:8000/admin` to access django admin page. For now the data is still empty to access the database create a superuser by `python manage.py createsuperuser` and follow the instruction.
