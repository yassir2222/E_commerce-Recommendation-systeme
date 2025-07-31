from rest_framework import serializers
from .models import Product, Category, CartItem,Cart


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


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductDetailSerializer(read_only=True)
    sub_total = serializers.SerializerMethodField()
    class Meta:
      model = CartItem
      fields = ["id","product","quantity","sub_total"]
    def get_sub_total(self ,cartitem):
        total = cartitem.product.price * cartitem.quantity
        return total

class CartSerializer(serializers.ModelSerializer):
   cartitems = CartItemSerializer(many=True , read_only=True)
   cart_total = serializers.SerializerMethodField()
   class Meta:
      model = Cart
      fields = ["id","cart_code","cartitems","cart_total"]

   def get_cart_total(self ,cart):
      items = cart.cartitems.all()
      total = sum([item.quantity * item.product.price for item in items])
      return total

class CartStatSerializer(serializers.ModelSerializer):
   total_quantity = serializers.SerializerMethodField()
   class Meta:
      model = Cart
      fields = ["id","cart_code","total_quantity"]

   def get_total_quantity(self ,cart):
      items = cart.cartitems.all()
      total = sum([item.quantity for item in items])
      return total