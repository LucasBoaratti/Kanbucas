-- Criando o banco de dados do projeto
CREATE DATABASE kanbucas;

-- "Usando" o banco de dados
USE kanbucas;

-- Criando a tabela de usuários
CREATE TABLE Usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(30) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL
);

-- Criando a tabela de tarefas
CREATE TABLE Tarefas(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	descricao TEXT NOT NULL,
    nome_setor VARCHAR(30) NOT NULL,
    prioridade ENUM("Baixa", "Média", "Alta") DEFAULT "Baixa" NOT NULL,
	data_cadastro DATE NOT NULL,
    status ENUM("A fazer", "Fazendo", "Pronto") DEFAULT "A fazer" NOT NULL,
	id_usuario INT NOT NULL
);

-- Adicionando a chave estrangeira para o ID do usuário na tabela de tarefas
ALTER TABLE Tarefas
ADD CONSTRAINT fk_usuarios
FOREIGN KEY(id_usuario) REFERENCES Usuarios(id);