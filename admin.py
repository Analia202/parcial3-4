from django.contrib import admin
from .models import Genre, Book, Order
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Admin de Géneros
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

# Admin de Libros
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'price')
    list_filter = ('genres',)
    search_fields = ('title', 'author', 'isbn')

# Admin de Órdenes (solo lectura)
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total', 'created_at')
    readonly_fields = ('user', 'books', 'total', 'comprobante', 'created_at')

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

# Admin de Usuarios (solo lectura)
class ReadOnlyUserAdmin(UserAdmin):
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.unregister(User)
admin.site.register(User, ReadOnlyUserAdmin)
