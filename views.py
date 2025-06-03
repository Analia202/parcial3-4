from django.contrib.auth import authenticate
from django.db.models import Count
from django.http import JsonResponse
from django.http.multipartparser import MultiPartParser
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, generics, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Book, Genre, CartItem, Order
from .serializers import (BookSerializer, GenreSerializer, CartItemSerializer,
                          OrderSerializer, UserRegisterSerializer)


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


    def get_queryset(self):
        queryset = Book.objects.all()
        genre_id = self.request.query_params.get('genre')
        if genre_id:
            queryset = queryset.filter(genres__id=genre_id)
        return queryset


class UploadReceiptView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)
        receipt_file = request.data.get('receipt')
        if receipt_file:
            order.receipt = receipt_file
            order.save()
            return Response({"message": "Comprobante subido exitosamente"}, status=200)
        else:
            return Response({"error": "No se recibió ningún archivo."}, status=400)

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.set_password(user.password)  # ¡Muy importante!
        user.save()

        # Crear token
        token = Token.objects.create(user=user)

        return Response({
            "user": serializer.data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def top_10_books(request):
    # Anotar cuántas veces aparece cada libro en órdenes
    books = Book.objects.annotate(
        total_sales=Count('order')
    ).order_by('-total_sales')[:10]

    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        response = JsonResponse({'success': True})
        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,  # Importantísimo: HttpOnly cookie
            secure=False,  # True en producción
            samesite='Lax'
        )
        return response
    else:
        return JsonResponse({'error': 'Invalid Credentials'}, status=400)