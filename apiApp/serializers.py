from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Product, Category, CartItem, Cart, Review, Wishlist, OrderItem, Order, CustomerAddress

from django.contrib.auth.models import User

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

class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = get_user_model()
      fields = ["id","first_name","last_name","profile_picture_url"]

class ReviewSerializer(serializers.ModelSerializer):
   user = UserSerializer(read_only=True)
   class Meta:
      model = Review
      fields = ['id','rating','review','created','updated',"user"]

class WishlistSerializer(serializers.ModelSerializer):
   user = UserSerializer(read_only=True)
   product = ProductListSerializer(read_only=True)
   class Meta:
      model = Wishlist
      fields = ["id","user","product","created_at"]


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ["id", "quantity", "product"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(read_only=True, many=True)
    class Meta:
        model = Order
        fields = ["id", "stripe_checkout_id", "amount", "items", "status", "created_at"]


class CustomerAddressSerializer(serializers.ModelSerializer):
   customer = UserSerializer(read_only=True)

   class Meta:
      model = CustomerAddress
      fields = "__all__"


class SimpleCartSerializer(serializers.ModelSerializer):
   num_of_items = serializers.SerializerMethodField()

   class Meta:
      model = Cart
      fields = ["id", "cart_code", "num_of_items"]

   def get_num_of_items(self, cart):
      num_of_items = sum([item.quantity for item in cart.cartitems.all()])
      return num_of_items