from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from users.models import User
from django.contrib import messages

# Vista de login
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            if not username or not password:
                return JsonResponse({'success': False, 'message': 'Both username and password are required.'})
            
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # Get CSRF token if you're using session-based authentication
                csrf_token = get_token(request)
                return JsonResponse({
                    'success': True,
                    'message': 'Welcome!',
                    'username': username,
                    'csrf_token': csrf_token,  # Include CSRF token if necessary
                })
            else:
                return JsonResponse({'success': False, 'message': 'Invalid credentials'})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON'})
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)



@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            first_name = data.get('firstName')
            last_name = data.get('lastName')
            password = data.get('password')
            if not all([username, email, first_name, last_name, password]):
                return JsonResponse({'success': False, 'message': 'All fields are required.'})
            if User.objects.filter(username=username).exists():
                return JsonResponse({'success': False, 'message': 'Username already exists.'})
            if User.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'message': 'Email already exists.'})
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                password=password
            )
            user.save()
            login(request, user)

            csrf_token = get_token(request)


            return JsonResponse({
                'success': True, 
                'message': 'User registered successfully!',
                'username': username,
                'csrf_token': csrf_token,
            })
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON'})
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)



def logout_view(request):
    logout(request) # Realiza el logout del usuario
    return JsonResponse({
        'success': True,
        'message': 'Logout ok!',
    })