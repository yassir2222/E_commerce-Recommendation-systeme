from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Product,Category
from .serializers import ProductSerializer,ProductListSerializer, ProductDetailSerializer,CategoryListSerializer,CategoryDetailSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(["GET"])
def product_list(request):
    products = Product.objects.filter(featured=True)
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def product_detail(request,slug):
    products = Product.objects.get(slug=slug)
    serializer = ProductDetailSerializer(products)
    return Response(serializer.data)


@api_view(["GET"])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategoryListSerializer(categories, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def category_detail(request,slug):
    categories = Category.objects.get(slug=slug)
    serializer = CategoryDetailSerializer(categories)
    return Response(serializer.data)