from django import forms
from .models import Packer


class PackerForm(forms.Form):
    '''Форма регистрации упаковщика'''
    packer_num = forms.CharField(
        max_length=15,
        label='Номер упаковщика',
    )

    def clean_packer_num(self):
        data = self.cleaned_data['packer_num']
        if not Packer.objects.filter(packer_num=data).exists():
            raise forms.ValidationError(
                'Упаковщик с таким номером не зарегистрирован!'
            )
        return data
