from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Product, Category, CartItem, Cart, ProductRating, Review, Wishlist, OrderItem, Order, CustomerAddress

from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
   class Meta:
      model = Product
      fields = ["id","name","slug","description","image","price"]


class ProductListSerializer(serializers.ModelSerializer):
   class Meta:
      model = Product
      fields = ["id","name","slug","image","price"]
      
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "email", "username", "first_name", "last_name", "profile_picture_url"]

    

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Review 
        fields = ["id", "user", "rating", "review", "created", "updated"]


class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating 
        fields =[ "id", "average_rating", "total_reviews"]




class ProductDetailSerializer(serializers.ModelSerializer):


    reviews = ReviewSerializer(read_only=True, many=True)
    rating = ProductRatingSerializer(read_only=True)
    poor_review = serializers.SerializerMethodField()
    fair_review = serializers.SerializerMethodField()
    good_review = serializers.SerializerMethodField()
    very_good_review = serializers.SerializerMethodField()
    excellent_review = serializers.SerializerMethodField()

    similar_products = serializers.SerializerMethodField()


    class Meta:
        model = Product
        fields = ["id", "name", "description", "slug", "image", "price", "reviews", "rating", "similar_products", "poor_review", "fair_review", "good_review",
                  "very_good_review", "excellent_review"]
        

    def get_similar_products(self, product):
        products = Product.objects.filter(category=product.category).exclude(id=product.id)
        serializer = ProductListSerializer(products, many=True)
        return serializer.data
    
    def get_poor_review(self, product):
        poor_review_count = product.reviews.filter(rating=1).count()
        return poor_review_count
    
    def get_fair_review(self, product):
        fair_review_count = product.reviews.filter(rating=2).count()
        return fair_review_count
    
    def get_good_review(self, product):
        good_review_count = product.reviews.filter(rating=3).count()
        return good_review_count
    
    def get_very_good_review(self, product):
        very_good_review_count = product.reviews.filter(rating=4).count()
        return very_good_review_count
    
    def get_excellent_review(self, product):
        excellent_review_count = product.reviews.filter(rating=5).count()
        return excellent_review_count




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
      fields = ["id","name","image","slug","products"]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
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