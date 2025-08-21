from django.contrib import admin
from .models import Usuarios, Tarefas

# Register your models here.

# Registrando as tabelas de usuário e tarefas no django admin
admin.site.register(Usuarios)
admin.site.register(Tarefas)