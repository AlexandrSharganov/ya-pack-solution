from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from .forms import PackerForm
from .models import Packer


def login_view(request):
    '''
    Вход для упаковщика. Фиксируем номер упаковщика, передаем на рабочий стол.
    '''
    form = PackerForm()
    if request.method == 'POST':
        form = form(request.POST)
    if form.is_valid():
        packer_num = form.cleaned_data['packer_num']
        return redirect('users:worktable', packer_num)
    return render(request, 'login.html', {'form': form})


def worktable_view(request, packer_num):
    '''
    Рабочий стол упаковщика.
    Это заглушка. Здесь должна быть обработка api фронта.
    '''
    packer = get_object_or_404(Packer, packer_num=packer_num)
    return HttpResponse(
        f'Вы вошли как {packer}.\n'
        'Здесь будет рабочее место упаковщика.'
    )
