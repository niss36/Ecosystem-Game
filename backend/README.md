# Backend

The backend is written in Python using the Django framework.

It exposes two POST API endpoints: `/model/new` and `/model/{guid}/update`; see madingley-interface.md for more on that.

It stores the game state in a database indexed by guid.

## Installation

You need python installed. You might want to use a Virtual Environment (venv) before doing the rest.

1. Make sure you're in the backend directory (and using venv if you wish to)
2. run `python -m pip install -r requirements.txt`
3. run `python src/manage.py migrate`

## Starting the server

Starts a local development server on port 8000.

1. run `python src/manage.py runserver`