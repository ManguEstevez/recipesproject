from django.contrib import admin

from recipes.models import Recipe, IngredientMeasure, FavouriteRecipe

admin.site.register(Recipe)
admin.site.register(IngredientMeasure)
admin.site.register(FavouriteRecipe)
