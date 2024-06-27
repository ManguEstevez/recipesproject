# Recipes web

This project has been done for ***Sviluppo Applicazioni Web*** subject.

 - **Author**: Manuel Estevez
 - **Date**: 27/06/2024

## Introduction

Recipe App is a web application that allows web users to search, view and save their favorite recipes. It is built using Django for the backend and React for the frontend. It is designed to allow the user to explore new flavors in a visual and interactive way.

## Project Structure

The project is divided into two main folders called backend and frontend. As it is said before, in the backend folder we will have the folders developed in a Django application and in frontend the ones corresponding to React.
```
recipesApp
|
├── backend         # Django API
│   ├── app/
│   ├── home/
│   ├── recipes/
│   ├── users/
│   └── manage.py
│
└─── frontend        # React app
    ├── users/
    ├── src/
    └── ...
```

### Backend:

**app/:** Contains the main Django project settings and configurations.
**home/:** Handles the main homepage view and templates.
**users/:** Manages user-related functionality such as authentication and user profiles.
**recipes/:** Contains all recipe-related models, views, and templates.
**manage.py:** Django's command-line utility for administrative tasks.

### Frontend:

**public/:** Contains the index.html and static assets like images or files for editing the frontend design (styles.css).
**src/:** Contains the React components, which are the ones that give visualization and functionalities to the web application.



## Installation steps

### Prerquisites
- Python 3.X
- Node.js and npm

### Backend

To use the Django app, first it's necessary to create a virtual environemt and then install the required dependencies with pip in it. For that the next commands may be used:

```
python -m venv ./env //Create virtual environment
.\env\Scripts\activate  //Activate env

pip install -r .\requirements.txt
```

Then, every time you make a modification that affects the database (models.py files), you have to execute the following commands.

```
python manage.py makemigrations 
python manage.py migrate 
```

Once this is done, proceed to start the Django server.

```
python manage.py runserver
```
#### Aditional commands

There are some commands that depending on the situation may be needed, such as the command for the creation of a superuser, which can access the django administrator. This command should be executed before starting django server.
```
python manage.py createsuperuser
```

### Frontend

Then, at another terminal, positioning in the frontend directory, you must install the following dependencies.
``` 
cd ..//frontend
npm install

```

Once this is done, and if the Django app is started, we start the React development server.
```
npm start
```

The React app should now be running on http://localhost:3000 and the Django server on http://localhost:8000.


## Example of use

Once the server is started visit in your browser the homepage at 'http://localhost:3000'. Then log in to access your account. If the user does not have any session, proceed to create your account. The user will be able to search for recipes and view recipe information even if he/she is not logged in or registered. The functionality provided to a logged-in user is the ability to both save recipes as favorites and to view the details of recipes that the user has previously saved as favorites.

## Contact

For any inquiries, please contact Manuel Estevez at m.estevezpapa@studenti.unipi.it.
