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