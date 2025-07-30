from rest_framework import serializers
from .models import Product,Category

class ProductSerializer(serializers.ModelSerializer):
   class Meta:
      model = Product
      fields = ["id","name","slug","description","image","price"]


class ProductListSerializer(serializers.ModelSerializer):
   class Meta:
      model = Product
      fields = ["id","name","slug","image","price"]

      
class ProductDetailSerializer(serializers.ModelSerializer):
   class Meta:
      model = Product
      fields = ["id","name","description","slug","image","price"]


class CategorySerializer(serializers.ModelSerializer):
   products = ProductListSerializer(many=True , read_only=True)
   class Meta:
      model = Category
      fields = ["id","name","image","products"]

      
class CategoryDetailSerializer(serializers.ModelSerializer):
   products = ProductListSerializer(many=True , read_only=True)
   class Meta:
      model = Category
      fields = ["id","name","image","products"]

      
class CategoryListSerializer(serializers.ModelSerializer):
   products = ProductListSerializer(many=True , read_only=True)
   class Meta:
      model = Category
      fields = ["id","name","image","slug"]