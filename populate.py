from books.models import Genre, Book
from django.contrib.auth.models import User
from decimal import Decimal
import random

def populate_data():
    genres = ['Ficción', 'Misterio', 'Romance', 'Ciencia Ficción', 'Fantasía']

    # Crear géneros
    genre_objs = []
    for name in genres:
        genre, created = Genre.objects.get_or_create(name=name)
        genre_objs.append(genre)

    # Crear libros
    for i in range(10):
        book = Book.objects.create(
            title=f"Libro {i+1}",
            author=f"Autor {i+1}",
            price=Decimal(random.randint(100, 500)),
            isbn=f"978-3-16-14841{i}",
            description=f"Descripción del libro {i+1}",
        )
        # Asignar géneros aleatorios
        selected_genres = random.sample(genre_objs, k=2)
        book.genres.set(selected_genres)
        book.save()

    print("¡Datos creados exitosamente!")
