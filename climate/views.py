from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Settings

def index(request):
    context = {
        'url_value': 'settings/'
    }
    print(Settings.objects.all())
    return render(request, 'main.html', context=context)

def settings(request):
    context = {
        'url_value': '/'
    }
    return render(request, 'settings.html', context=context)


def get_url(request):
    if request.method == 'POST':
        url_tofind = request.POST.get('input1')
        return redirect('/')

    return render(request, 'main.html')


def get_settings(request):
    if request.method == 'POST':
        one_setting = Settings(name="user")
        one_setting.configure1 = request.POST.get('input1')
        one_setting.configure2 = request.POST.get('input2')
        one_setting.configure3 = request.POST.get('input3')
        one_setting.configure4 = request.POST.get('input4')
        one_setting.configure5 = request.POST.get('input5')
        print("saved!")
        one_setting.save()
        return redirect('/settings/')

    return render(request, 'main.html')
