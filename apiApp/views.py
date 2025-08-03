from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Product, Category, Cart, CartItem, Review , Wishlist
from .serializers import ProductSerializer, ProductListSerializer, ProductDetailSerializer, CategoryListSerializer, \
    CategoryDetailSerializer, CartItemSerializer, CartSerializer, ReviewSerializer,WishlistSerializer
from rest_framework.response import Response
from django.db.models import Q
import stripe
from django.conf import settings

# Create your views here.

User = get_user_model()
stripe.api_key = settings.STRIPE_SECRET_KEY

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

@api_view(["POST"])
def add_to_cart(request):
    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")

    cart, created = Cart.objects.get_or_create(cart_code=cart_code)
    product = Product.objects.get(id=product_id)

    cartitem ,created = CartItem.objects.get_or_create(product=product , cart=cart)
    cartitem.quantity = 1
    cartitem.save()

    serializer = CartSerializer(cart)
    return Response(serializer.data)



@api_view(['PUT'])
def update_cartitem_quantity(request):
    cartitem_id = request.data.get("item_id")
    quantity = request.data.get("quantity")

    quantity = int(quantity)

    cartitem = CartItem.objects.get(id=cartitem_id)
    cartitem.quantity = quantity
    cartitem.save()

    serializer = CartItemSerializer(cartitem)
    return Response({"data": serializer.data, "message": "Cartitem updated successfully!"})

@api_view(["POST"])
def add_review(request):
    product_id = request.data.get("product_id")
    email = request.data.get("email")
    rating = request.data.get("rating")
    review_text = request.data.get("review")

    product = Product.objects.get(id=product_id)
    user = User.objects.get(email=email)
    if Review.objects.filter(product=product, user=user).exists():
        return Response({"message": "Review already exists!"})

    review = Review.objects.create(product=product, user=user, rating=rating , review=review_text)
    serializer = ReviewSerializer(review)
    return Response(serializer.data)


@api_view(["POST"])
def add_review(request):
    product_id = request.data.get("product_id")
    email = request.data.get("email")
    rating = request.data.get("rating")
    review_text = request.data.get("review")

    product = Product.objects.get(id=product_id)
    user = User.objects.get(email=email)
    if Review.objects.filter(product=product, user=user).exists():
        return Response({"message": "Review already exists!"})

    review = Review.objects.create(product=product, user=user, rating=rating , review=review_text)
    serializer = ReviewSerializer(review)
    return Response(serializer.data)

@api_view(['PUT'])
def update_review(request, pk):
    review = Review.objects.get(id=pk)
    rating = request.data.get("rating")
    review_text = request.data.get("review")

    review.rating = rating
    review.review = review_text
    review.save()

    serializer = ReviewSerializer(review)
    return Response(serializer.data)



@api_view(['DELETE'])
def delete_review(request, pk):
    review = Review.objects.get(id=pk)
    review.delete()

    return Response("Review deleted successfully!", status=204)

@api_view(['DELETE'])
def delete_cartitem(request, pk):
    cartitem = CartItem.objects.get(id=pk)
    cartitem.delete()

    return Response("Cart item deleted successfully!", status=204)


@api_view(["POST"])
def add_to_wishlist(request):
    email = request.data.get("email")
    product_id = request.data.get("product_id")

    user = User.objects.get(email=email)
    user = User.objects.get(email=email)
    product = Product.objects.get(id=product_id)

    wishlist = Wishlist.objects.filter(user=user, product=product)
    if wishlist:
        wishlist.delete()
        return Response("Wishlist deleted successfully!", status=204)

    new_wishlist = Wishlist.objects.create(user=user, product=product)
    serializer = WishlistSerializer(new_wishlist)
    return Response(serializer.data)


@api_view(['GET'])
def product_search(request):
    query = request.query_params.get("query")
    if not query:
        return Response("No query provided", status=400)

    products = Product.objects.filter(Q(name__icontains=query) |
                                      Q(description__icontains=query) |
                                      Q(category__name__icontains=query))
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)




@api_view(['POST'])
def create_checkout_session(request):
    print(settings.STRIPE_SECRET_KEY)
    cart_code = request.data.get("cart_code")
    email = request.data.get("email")
    cart = Cart.objects.get(cart_code=cart_code)
    try:
        checkout_session = stripe.checkout.Session.create(
            customer_email=email,
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data':{
                        'currency': 'usd',
                        'product_data': {'name':item.product.name},
                        'unit_amount' : int(item.product.price)*100,
                    },
                    'quantity' : item.quantity,

                }
                for item in cart.cartitems.all()
            ],
            mode='payment',
            success_url="http://localhost:8008/sucess",
            cancel_url="http://localhost:8008/cancel" ,
        )
        return Response({ 'data':checkout_session})

    except Exception as e:
        return Response({ 'error':str(e)}, status=400)


