from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView

urlpatterns = [
    path('categories/', CategoryListView.as_view()),
    path('products/', ProductListView.as_view()),
    path('products/<int:id>/', ProductDetailView.as_view()),
]
