from django.urls import path
from .views import CheckoutView, OrderListView

urlpatterns = [
    path('checkout/', CheckoutView.as_view()),
    path('', OrderListView.as_view()),
]
