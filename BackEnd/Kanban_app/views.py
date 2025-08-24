from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Usuarios, Tarefas
from .serializers import UsuarioSerializer, TarefaSerializer

# Create your views here.

# Classe que faz a consulta dos usuários e os exibe em formato JSON
class UsuariosLCAPIView(ListCreateAPIView):
    queryset = Usuarios.objects.all()

    serializer_class = UsuarioSerializer
# Classe que faz a consulta das tarefas e as exibe em formato JSON
class TarefasLCAPIView(ListCreateAPIView):
    queryset = Tarefas.objects.all()

    serializer_class = TarefaSerializer

# Classe que atualiza e deleta tarefas
class TarefasRUDAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Tarefas.objects.all()

    serializer_class = TarefaSerializer

    lookup_field = "pk"