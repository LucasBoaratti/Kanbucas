CREATE DATABASE kanbucas;

USE kanbucas;

CREATE TABLE Usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(30) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL
);

CREATE TABLE Tarefas(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	descricao TEXT NOT NULL,
    nome_setor VARCHAR(30) NOT NULL,
    prioridade ENUM("Baixa", "Média", "Alta") DEFAULT "Baixa" NOT NULL,
	data_cadastro DATE NOT NULL,
    status ENUM("A fazer", "Fazendo", "Pronto") DEFAULT "A fazer" NOT NULL,
	id_usuario INT NOT NULL
);

ALTER TABLE Tarefas
ADD CONSTRAINT fk_usuarios
FOREIGN KEY(id_usuario) REFERENCES Usuarios(id);