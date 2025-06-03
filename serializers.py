from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Book, Genre, CartItem, Order

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'price', 'isbn', 'description', 'image', 'genres']

class CartItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'book', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'books', 'total_amount', 'qr_code', 'payment_proof', 'created_at']


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}
