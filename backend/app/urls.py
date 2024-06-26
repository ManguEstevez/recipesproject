from django.contrib import admin
from django.urls import path

from home.views import get_csrf_token
from users.views import login_view, signup_view, logout_view

#Hay que importar las vistas desde recipes.views (recipe_view)
from recipes.views import RecipeView, add_to_favourites, favourite_recipes

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('get-csrf-token', get_csrf_token, name='get_csrf_token'),
    path('admin', admin.site.urls),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
    path('signup', signup_view, name='signup'),
    path('recipes', RecipeView.as_view(), name='recipe'), 
    path('favourites/add/<str:recipe_id>/', add_to_favourites, name='add_to_favourites'),
    path('favourites', favourite_recipes, name='favourite_recipes'),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)