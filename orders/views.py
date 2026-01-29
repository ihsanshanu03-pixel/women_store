from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from decimal import Decimal

from cart.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart_items = Cart.objects.filter(user=request.user)

        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        total = Decimal('0.00')

        # calculate total
        for item in cart_items:
            total += item.product.price * item.quantity

        # create order
        order = Order.objects.create(
            user=request.user,
            total_price=total
        )

        # create order items
        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        # clear cart
        cart_items.delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data)


class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
