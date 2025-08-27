from django.urls import path
from .views import UsuariosLCAPIView, TarefasLCAPIView, TarefasRUDAPIView

# URLS do projeto
urlpatterns = [
    path("usuarios", view=UsuariosLCAPIView.as_view(), name="Listar e criar usuários."),
    path("tarefas", view=TarefasLCAPIView.as_view(), name="Listar e criar tarefas."),
    path("tarefas/<int:pk>", view=TarefasRUDAPIView.as_view(), name="Atualizar e deletar tarefas."),
]