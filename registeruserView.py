from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

class RegisterUserView(generics.CreateAPIView):
    serializer_class = serializers.ModelSerializer

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        token = Token.objects.create(user=user)

        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
