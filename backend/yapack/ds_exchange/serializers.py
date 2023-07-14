from api.serializers import OrderReceivedSerializer
from orders.models import OrderReceived


class OrderReceivedDsSerializer(OrderReceivedSerializer):
    """Сериализатор для обмена с моделью DS."""

    class Meta:
        model = OrderReceived
        fields = ('order_key', 'skus', 'status',)
