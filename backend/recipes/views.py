from django.shortcuts import render, get_object_or_404
from django.views import View
from django.http import JsonResponse
import json
from .models import Recipe, IngredientMeasure, FavouriteRecipe
from users.models import User
from django.db.models import Q

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required



def extract_video_id(youtube_url):
    video_id = youtube_url.split('?v=')[1]
    if '&' in video_id:
        video_id = video_id.split('&')[0]
    return video_id

class RecipeView(View):

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        recipe_name = data.get('recipe_name')
        if not recipe_name:
            return JsonResponse({'success': False, 'message': 'Recipe name is required.'})
        
        # Search recipes by name or ingredients
        recipes = Recipe.objects.filter(
            Q(strMeal__icontains=recipe_name) |
            Q(ingredients__ingredient__icontains=recipe_name)
        ).distinct()

        if not recipes.exists():
            return JsonResponse({'success': False, 'message': 'No recipes found.'})

        recipes_data = []
        for recipe in recipes:
            ingredients = recipe.ingredients.all()
            ingredient_measure_pairs = [{'ingredient': im.ingredient, 'measure': im.measure} for im in ingredients]
            
            recipes_data.append({
                'idMeal': recipe.idMeal,
                'strMeal': recipe.strMeal,
                'strCategory': recipe.strCategory,
                'strArea': recipe.strArea,
                'strInstructions': recipe.strInstructions,
                'strMealThumb': recipe.strMealThumb,
                'strTags': recipe.strTags,
                'strYoutube': recipe.strYoutube,
                'strSource': recipe.strSource,
                'dateModified': recipe.dateModified,
                'ingredient_measure_pairs': ingredient_measure_pairs,
            })
        
        return JsonResponse({'success': True, 'recipes': recipes_data})

def add_to_favourites(request, recipe_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = get_object_or_404(User, username=data['username'])
            recipe = Recipe.objects.get(idMeal=recipe_id)
            favourite, created = FavouriteRecipe.objects.get_or_create(user=user, recipe=recipe)
            if created:
                return JsonResponse({'success': True, 'message': 'Recipe added to favourites!'})
            else:
                return JsonResponse({'success': False, 'message': 'Recipe already in favourites.'})
        except Recipe.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Recipe not found.'})
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)

def favourite_recipes(request):
    username = request.GET.get('username')
    favourites = FavouriteRecipe.objects.filter(user__username=username).select_related('recipe').order_by('-date_added')
    favourite_recipes = [{
        'idMeal': fav.recipe.idMeal,
        'strMeal': fav.recipe.strMeal,
        'strMealThumb': fav.recipe.strMealThumb,
        'strCategory': fav.recipe.strCategory,
        'strArea': fav.recipe.strArea,
        'strInstructions': fav.recipe.strInstructions,
        'ingredient_measure_pairs': [{
            'ingredient': ing.measure,
            'measure': ing.measure
        } for ing in fav.recipe.ingredients.all()]
    } for fav in favourites]
    return JsonResponse({'success': True, 'favourites': favourite_recipes})