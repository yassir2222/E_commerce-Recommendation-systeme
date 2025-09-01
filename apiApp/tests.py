import uuid
from unittest.mock import patch
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Product, Category, Cart, CartItem, Review, Wishlist, CustomerAddress, Order, OrderItem

User = get_user_model()

class ShopAPITests(APITestCase):
    """
    Test suite for the Shop API views.
    """

    def setUp(self):
        """
        Set up the necessary objects for the tests.
        This method is run before each test.
        """
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        self.category = Category.objects.create(name='Electronics', slug='electronics')
        self.product = Product.objects.create(
            name='Test Laptop',
            slug='test-laptop',
            category=self.category,
            price=1200.00,
            featured=True
        )
        self.product_not_featured = Product.objects.create(
            name='Old Monitor',
            slug='old-monitor',
            category=self.category,
            price=150.00,
            featured=False
        )
        self.cart_code = str(uuid.uuid4())
        self.cart = Cart.objects.create(cart_code=self.cart_code)
        self.cart_item = CartItem.objects.create(cart=self.cart, product=self.product, quantity=1)
        self.review = Review.objects.create(product=self.product, user=self.user, rating=4, review='Good product!')


    ##
    ## Product and Category Tests
    ##
    def test_product_list(self):
        """ Test the product_list view returns only featured products. """
        url = reverse('product_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.product.name)

    def test_product_detail(self):
        """ Test the product_detail view can retrieve a product by slug. """
        url = reverse('product_detail', kwargs={'slug': self.product.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.product.name)

    def test_category_list(self):
        """ Test the category_list view returns all categories. """
        url = reverse('category_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.category.name)

    def test_category_detail(self):
        """ Test the category_detail view can retrieve a category by slug. """
        url = reverse('category_detail', kwargs={'slug': self.category.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.category.name)


    ##
    ## Cart Tests
    ##
    def test_get_cart(self):
        """ Test retrieving a specific cart. """
        url = reverse('get_cart', kwargs={'cart_code': self.cart_code})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['cart_code'], self.cart_code)
        self.assertEqual(len(response.data['cartitems']), 1)

    def test_add_to_cart(self):
        """ Test a product can be added to a cart. """
        url = reverse('add_to_cart')
        new_product = Product.objects.create(name='New Mouse', slug='new-mouse', price=25.00)
        data = {'cart_code': self.cart_code, 'product_id': new_product.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CartItem.objects.count(), 2)
        self.assertTrue(CartItem.objects.filter(cart__cart_code=self.cart_code, product=new_product).exists())

    def test_update_cartitem_quantity(self):
        """ Test a cart item's quantity can be updated. """
        url = reverse('update_cartitem_quantity')
        data = {'item_id': self.cart_item.id, 'quantity': 5}
        response = self.client.put(url, data, format='json')
        self.cart_item.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.cart_item.quantity, 5)

    def test_delete_cartitem(self):
        """ Test a cart item can be deleted. """
        url = reverse('delete_cartitem', kwargs={'pk': self.cart_item.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(CartItem.objects.filter(id=self.cart_item.id).exists())
    
    def test_product_in_cart(self):
        """ Test checking if a product exists in the cart. """
        url = reverse('product_in_cart')
        response_true = self.client.get(url, {'cart_code': self.cart_code, 'product_id': self.product.id})
        self.assertEqual(response_true.status_code, status.HTTP_200_OK)
        self.assertTrue(response_true.data['product_in_cart'])
        
        response_false = self.client.get(url, {'cart_code': self.cart_code, 'product_id': self.product_not_featured.id})
        self.assertEqual(response_false.status_code, status.HTTP_200_OK)
        self.assertFalse(response_false.data['product_in_cart'])


    ##
    ## Review Tests
    ##
    def test_add_review(self):
        """ Test a user can add a review. """
        Review.objects.all().delete() # Clear review from setUp
        url = reverse('add_review')
        data = {'product_id': self.product.id, 'email': self.user.email, 'rating': 5, 'review': 'Awesome!'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Review.objects.filter(user=self.user, product=self.product).exists())

    def test_update_review(self):
        """ Test an existing review can be updated. """
        url = reverse('update_review', kwargs={'pk': self.review.id})
        data = {'rating': 5, 'review': 'Actually, it is excellent!'}
        response = self.client.put(url, data, format='json')
        self.review.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.review.rating, 5)
        self.assertEqual(self.review.review, 'Actually, it is excellent!')

    def test_delete_review(self):
        """ Test a review can be deleted. """
        url = reverse('delete_review', kwargs={'pk': self.review.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Review.objects.filter(id=self.review.id).exists())


    ##
    ## Wishlist Tests
    ##
    def test_add_to_wishlist(self):
        """ Test a product can be added to a wishlist. """
        url = reverse('add_to_wishlist')
        data = {'email': self.user.email, 'product_id': self.product.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Wishlist.objects.filter(user=self.user, product=self.product).exists())

    def test_my_wishlists(self):
        """ Test retrieving a user's wishlist. """
        Wishlist.objects.create(user=self.user, product=self.product)
        url = reverse('my_wishlists')
        response = self.client.get(url, {'email': self.user.email})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['product']['name'], self.product.name)

    def test_product_in_wishlist(self):
        """ Test checking if a product is in a user's wishlist. """
        Wishlist.objects.create(user=self.user, product=self.product)
        url = reverse('product_in_wishlist')
        # Case when product IS in wishlist
        response_true = self.client.get(url, {'email': self.user.email, 'product_id': self.product.id})
        self.assertTrue(response_true.data['product_in_wishlist'])
        # Case when product is NOT in wishlist
        response_false = self.client.get(url, {'email': self.user.email, 'product_id': self.product_not_featured.id})
        self.assertFalse(response_false.data['product_in_wishlist'])


    ##
    ## Search Test
    ##
    def test_product_search(self):
        """ Test product search returns relevant products. """
        url = reverse('search')
        response = self.client.get(url, {'query': 'Laptop'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Laptop')


    ##
    ## User and Address Tests
    ##
def test_create_user(self):
    """ Test a new user can be created. """
    url = reverse('create_user')
    data = {
        "username": "newuser",
        "email": "new@example.com",
        "first_name": "New",
        "last_name": "User"
    }
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertTrue(User.objects.filter(email="new@example.com").exists())

    def test_existing_user(self):
        """ Test checking for an existing user. """
        url = reverse('existing_user', kwargs={'email': self.user.email})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['exists'])

    def test_add_address(self):
        """ Test a customer address can be added. """
        url = reverse('add_address')
        data = {"email": self.user.email, "street": "123 Main St", "city": "Anytown"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(CustomerAddress.objects.filter(customer=self.user, city="Anytown").exists())

    def test_get_address(self):
        """ Test retrieving a customer's address. """
        CustomerAddress.objects.create(customer=self.user, street="456 Test Ave", city="Testville")
        url = reverse('get_address')
        response = self.client.get(url, {'email': self.user.email})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['city'], 'Testville')


    ##
    ## Stripe and Order Tests (with mocking)
    ##
    @patch('apiApp.views.stripe.checkout.Session.create')
    def test_create_checkout_session(self, mock_stripe_create):
        """ Test a Stripe checkout session can be created. """
        mock_stripe_create.return_value = {'id': 'cs_test_123', 'url': 'https://checkout.stripe.com/test'}
        url = reverse('create_checkout_session')
        data = {'cart_code': self.cart_code, 'email': self.user.email}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_stripe_create.assert_called_once()

    @patch('apiApp.views.stripe.Webhook.construct_event')
    def test_webhook_and_order_fulfillment(self, mock_construct_event):
        """ Test the webhook processes an event and creates an order. """
        fake_session = {
            'id': 'cs_test_abc123', 'amount_total': 120000, 'currency': 'usd',
            'customer_email': self.user.email, 'metadata': {'cart_code': self.cart_code}
        }
        mock_construct_event.return_value = {'type': 'checkout.session.completed', 'data': {'object': fake_session}}
        url = reverse('webhook')
        response = self.client.post(url, data='{}', content_type='application/json', HTTP_STRIPE_SIGNATURE='dummy_sig')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Order.objects.filter(stripe_checkout_id='cs_test_abc123').exists())
        self.assertFalse(Cart.objects.filter(cart_code=self.cart_code).exists())
    
    def test_get_orders(self):
        """ Test retrieving orders for a specific email. """
        Order.objects.create(customer_email=self.user.email, amount=150.00, status="Paid")
        url = reverse('get_orders')
        response = self.client.get(url, {'email': self.user.email})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['amount'], '150.00')