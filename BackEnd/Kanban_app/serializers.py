from rest_framework.serializers import ModelSerializer
from .models import Usuarios, Tarefas

# Classe do usuário em serializer para ser transformada em JSON 
class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuarios

        fields = "__all__"

# Classe da tarefa em serializer para ser transformada em JSON
class TarefaSerializer(ModelSerializer):
    class Meta:
        model = Tarefas

        fields = "__all__"