from django import forms


class OrdersNumForm(forms.Form):
    """Форма получения количества заказов."""
    CHOICES = [
        (1, '1 заказ'),
        (10, '10 заказов'),
        (100, '100 заказов'),
    ]
    orders_num = forms.ChoiceField(
        widget=forms.RadioSelect(),
        choices=CHOICES
    )
