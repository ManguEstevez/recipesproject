import requests
from django.core.management.base import BaseCommand
from recipes.models import Recipe, IngredientMeasure

class Command(BaseCommand):
    help = 'Fetch meals from the API and store them in the database'

    def handle(self, *args, **options):
        base_url = 'https://www.themealdb.com/api/json/v1/1/search.php?f='
        #alphabet = 'rp'
        alphabet = 'abcdefghijklmnopqrstuvwxyz'
        
        for letter in alphabet:
            response = requests.get(base_url + letter)
            data = response.json()

            if data['meals'] is not None:
                for meal in data['meals']:
                    self.store_meal(meal)
                self.stdout.write(self.style.SUCCESS(f'{letter} completed'))

        self.stdout.write(self.style.SUCCESS('Successfully fetched and stored meals.'))

    def store_meal(self, meal):
        recipe, created = Recipe.objects.update_or_create(
            idMeal=meal['idMeal'],
            defaults={
                'strMeal': meal['strMeal'],
                'strCategory': meal['strCategory'],
                'strArea': meal['strArea'],
                'strInstructions': meal['strInstructions'],
                'strMealThumb': meal['strMealThumb'],
                'strTags': meal['strTags'],
                'strYoutube': self.format_youtube_url(meal['strYoutube']),
                'strSource': meal['strSource'],
                'dateModified': meal['dateModified'],
            }
        )

        IngredientMeasure.objects.filter(recipe=recipe).delete()
        ingredient_measure_pairs = self.extract_ingredient_measure_pairs(meal)

        for pair in ingredient_measure_pairs:
            IngredientMeasure.objects.create(
                recipe=recipe,
                ingredient=pair['ingredient'],
                measure=pair['measure']
            )

    def format_youtube_url(self, youtube_url):
        try:
            # Split the URL by '?v=' to get the video ID
            video_id = youtube_url.split('?v=')[1]
            # If there are additional parameters after the video ID, split by '&' and take the first part
            if '&' in video_id:
                video_id = video_id.split('&')[0]
            
            return f"https://www.youtube.com/embed/{video_id}"
        except:
            return f""

    def extract_ingredient_measure_pairs(self, meal):
        pairs = []
        for i in range(1, 21):
            ingredient = meal.get(f'strIngredient{i}')
            measure = meal.get(f'strMeasure{i}')
            if ingredient and measure:
                pairs.append({'ingredient': ingredient, 'measure': measure})
        return pairs
