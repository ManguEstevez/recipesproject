from django.db import models

# Necesarios para cargar el script de las recetas en la base de datos
import os
import sys
import json
import django
from django.conf import settings
from django.core.management import execute_from_command_line
from users.models import User



# Clase para definir la estructura de los datos JSON de las recetas.
class Recipe(models.Model):
    idMeal = models.CharField(max_length=10, unique=True)
    strMeal = models.CharField(max_length=255)
    strCategory = models.CharField(max_length=50, null=True, blank=True)
    strArea = models.CharField(max_length=50, null=True, blank=True)
    strInstructions = models.TextField(null=True, blank=True)
    strMealThumb = models.URLField(max_length=255, null=True, blank=True)
    strTags = models.CharField(max_length=255, null=True, blank=True)
    strYoutube = models.URLField(max_length=255, null=True, blank=True)
    strSource = models.URLField(max_length=255, null=True, blank=True)
    dateModified = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.strMeal

class IngredientMeasure(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='ingredients', on_delete=models.CASCADE)
    ingredient = models.CharField(max_length=255)
    measure = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.ingredient} ({self.measure})"

class FavouriteRecipe(models.Model):
    user = models.ForeignKey(User, related_name='favourites', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='favourited_by', on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'recipe')

    def __str__(self):
        return f"{self.user.username} - {self.recipe.strMeal}"


# Funcion que toma la ruta del .JSON como argumento
# Configura Django y accede a los modelos 'Recipe' y 'IngredientMeasure'
# Lee el archivo y crea instancias de los modelos en la DB
def load_recipes(json_file_path):
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
    django.setup()

    from myapp.models import Recipe, IngredientMeasure  # Asegúrate de que el nombre de la aplicación sea correcto

    with open(json_file_path, 'r') as file:
        data = json.load(file)
        for item in data['meals']:
            recipe, created = Recipe.objects.get_or_create(
                idMeal=item['idMeal'],
                defaults={
                    'strMeal': item['strMeal'],
                    'strCategory': item.get('strCategory'),
                    'strArea': item.get('strArea'),
                    'strInstructions': item.get('strInstructions'),
                    'strMealThumb': item.get('strMealThumb'),
                    'strTags': item.get('strTags'),
                    'strYoutube': item.get('strYoutube'),
                    'strSource': item.get('strSource'),
                    'dateModified': item.get('dateModified')
                }
            )
            for i in range(1, 21):
                ingredient_key = f"strIngredient{i}"
                measure_key = f"strMeasure{i}"
                ingredient = item.get(ingredient_key)
                measure = item.get(measure_key)
                if ingredient:
                    IngredientMeasure.objects.create(
                        recipe=recipe,
                        ingredient=ingredient,
                        measure=measure
                    )

    print('Successfully loaded recipes')

# Anhade condicion para ejecutar load_recipes cuando se pase el argumento
# python manage.py load_recipes pathJSON.json
if __name__ == '__main__':
    if 'load_recipes' in sys.argv:
        json_file_path = sys.argv[2] if len(sys.argv) > 2 else 'path_to_your_json_file.json'
        load_recipes(json_file_path)
        sys.exit()
    execute_from_command_line(sys.argv)
