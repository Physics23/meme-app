from django.shortcuts import render



def home(request):
    
    return render(request, 'meme_app/index.html')
