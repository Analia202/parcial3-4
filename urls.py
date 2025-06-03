from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .registeruserView import RegisterUserView
from .views import BookViewSet, GenreViewSet, CartItemViewSet, OrderViewSet, top_10_books, login_view, UploadReceiptView
from rest_framework.authtoken.views import obtain_auth_token  # <-- Para login API

router = DefaultRouter()
router.register(r'genres', GenreViewSet)
router.register(r'books', BookViewSet)
router.register(r'cart', CartItemViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterUserView.as_view(), name='register'),       # <-- Registro de usuarios
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('top-books/', top_10_books, name='top_books'),# <-- Login (obtener token)
    path('login/', login_view, name='login'),
    path('orders/<int:order_id>/upload_receipt/', UploadReceiptView.as_view(), name='upload_receipt'),

]
