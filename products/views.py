from django.shortcuts import render, get_object_or_404
from .models import Category, Product

def home(request):
    categories = Category.objects.all()
    products = Product.objects.all()
    
    # Optional: Filter by category if provided in query params
    category_id = request.GET.get('category')
    if category_id:
        products = products.filter(category_id=category_id)
        
    context = {
        'categories': categories,
        'products': products,
        'active_category_id': int(category_id) if category_id else None
    }
    return render(request, 'index.html', context)

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'product_detail.html', {'product': product})
