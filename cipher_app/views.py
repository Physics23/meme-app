from django.shortcuts import render

# Create your views here.
from django.shortcuts import render


def cipherhome(request):
    
    return render(request, 'cipher_app\index1.html')