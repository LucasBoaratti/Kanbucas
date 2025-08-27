from rest_framework import serializers
from .models import Usuarios, Tarefas

# Classe do usuário em serializer para ser transformada em JSON 
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios

        fields = "__all__"

# Classe da tarefa em serializer para ser transformada em JSON
class TarefaSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.CharField(source="id_usuario.nome", read_only=True)
    
    class Meta:
        model = Tarefas

        fields = ['id', 'descricao', 'nome_setor', 'prioridade', 'id_usuario', 'nome_usuario', 'status', 'data_cadastro']