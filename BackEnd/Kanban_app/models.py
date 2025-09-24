from django.db import models

# Create your models here.

# Classe para armazenar dados do usuário
class Usuarios(models.Model):
    nome = models.CharField(max_length=30)
    email = models.CharField(max_length=254, unique=True)

    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name_plural = "Usuários"

# Classe para armazenar dados das tarefas
class Tarefas(models.Model):
    # Campos de escolha de prioridades
    select_prioridades = (
        ("Baixa", "Baixa"),
        ("Média", "Média"),
        ("Alta", "Alta"),
    )

    # Campos de escolha de status
    select_status = (
        ("A fazer", "A fazer"),
        ("Fazendo", "Fazendo"),
        ("Pronto", "Pronto"),
    )

    descricao = models.TextField()
    nome_setor = models.CharField(max_length=30)
    prioridade = models.CharField(max_length=5, choices=select_prioridades, default="Alta")
    data_cadastro = models.DateField()
    status = models.CharField(max_length=10, choices=select_status, default="A fazer")
    id_usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)

    def __str__(self):
        return f"Tarefa: {self.nome_setor}"
    
    class Meta:
        verbose_name_plural = "Tarefas" 