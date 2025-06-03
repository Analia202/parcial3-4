from django.contrib import admin
from django.db import models
from django.contrib.auth.models import User


class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    isbn = models.CharField(max_length=13)
    description = models.TextField()
    image = models.ImageField(upload_to='book_images/', blank=True, null=True)
    genres = models.ManyToManyField(Genre, related_name='books')

    def __str__(self):
        return self.title

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.book.title} - {self.user.username}"




class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    comprobante = models.ImageField(upload_to='comprobantes/',null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Orden #{self.id} - {self.user.username}"
