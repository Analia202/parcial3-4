
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    comprobante = models.ImageField(upload_to='comprobantes/',null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Orden #{self.id} - {self.user.username}"
