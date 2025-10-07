import { render, screen, fireEvent } from "@testing-library/react";
import { CadastroTarefas } from "../Pages/Tarefas/CadastroTarefas";
import { describe, it, expect, beforeEach, afterAll } from "vitest";

// Caso de teste para verificar se os campos estão presentes
describe("Cadastro de tarefas", () => {
    it("Exibe os campos do cadastro de tarefas", () => {
        render(<CadastroTarefas/>);

        const descricao = screen.getByLabelText(/descricao/i);
        const nome_setor = screen.getByLabelText(/setor/i);
        const prioridade = screen.getByLabelText(/prioridade/i);
        const usuario = screen.getByLabelText(/usuario/i);
        const data_cadastro = screen.getByLabelText(/dataCadastro/i);
        const status = screen.getByLabelText(/status/i);
        const botao = screen.getByRole("button", {name: /Cadastrar/i});

        expect(descricao).toBeTruthy();
        expect(nome_setor).toBeTruthy();
        expect(prioridade).toBeTruthy();
        expect(usuario).toBeTruthy();
        expect(data_cadastro).toBeTruthy();
        expect(status).toBeTruthy();
        expect(botao).toBeTruthy();
    });
});

// Caso de teste para verificar se o usuário digitou nada na descrição da tarefa
describe("Teste para verificar se há algo escrito na descrição da tarefa", () => {
    it("Exibe o erro falando pro usuário digitar algo para a descrição da tarefa", async () => {
        render(<CadastroTarefas/>);

        const descricao = screen.getByLabelText(/descricao/i);

        fireEvent.change(descricao, {target: { value: "" } });
        fireEvent.blur(descricao);

        const erro = await screen.findByText(/Descreva a tarefa, por favor./i);

        expect(erro).toBeInTheDocument();
    });
});

// Caso de teste para verificar se o usuário digitou mais de 100 caracteres na descrição da tarefa
describe("Teste para verificar se o usuário digitou mais de 100 caracteres na descrição da tarefa", () => {
    it("Exibe o erro caso o usuário digite mais de 100 caracteres na descrição da tarefa", async () => {
        render(<CadastroTarefas/>);

        const descricao = screen.getByLabelText(/descricao/i);

        fireEvent.change(descricao, {target: { value: "Tarefa que representa uma coisa muito importante...".repeat(101) } });
        fireEvent.blur(descricao);

        const erro = await screen.findByText(/A descrição da tarefa não pode ultrapassar 100 caracteres./i);

        expect(erro).toBeInTheDocument();
    });
});

// Caso de teste para verificar se o usuário digitou nada no campo setor
describe("Teste para verificar se há algo escrito no campo setor", () => {
    it("Exibe o erro falando pro usuário digitar algo no campo setor", async () => {
        render(<CadastroTarefas/>);

        const nome_setor = screen.getByLabelText(/nome_setor/i);

        fireEvent.change(nome_setor, {target: { value: "" } });
        fireEvent.blur(nome_setor);

        const erro = await screen.findByText(/O campo setor não pode estar vazio./i);

        expect(erro).toBeInTheDocument();
    });
});

// Caso de teste para verificar se o usuário digitou mais de 50 caracteres no campo setor
describe("Teste para verificar se o usuário digitou mais de 50 caracteres no campo setor", () => {
    it("Exibe o erro caso o usuário digite mais de 50 caracteres no campo setor", async () => {
        render(<CadastroTarefas/>);

        const nome_setor = screen.getByLabelText(/nome_setor/i);

        fireEvent.change(nome_setor, {target: { value: "SENAI".repeat(51) } });
        fireEvent.blur(nome_setor);

        const erro = await screen.findByText(/O nome do setor não pode ultrapassar 50 caracteres./i);

        expect(erro).toBeInTheDocument();
    });
});

// Caso de teste para verificar se um campo da seção de prioridade foi escolhido
describe("Verificando se o campo prioridade foi selecionado", () => {
    it("Exibe o erro se nenhuma prioridade for escolhida", async () => {
        render(<CadastroTarefas/>);

        const prioridade = screen.getByLabelText(/prioridade/i);

        fireEvent.blur(prioridade);

        const erro = await screen.findByText(/Escolha ao menos uma prioridade, por favor./i);

        expect(erro).toBeInTheDocument();
    });
});

// Caso de teste para verificar se a data escolhida pelo usuário não esteja no futuro
const data = new Date('2025-10-07T10:00:00');

describe("Validação de data no futuro", () => {
    jest.useFakeTimers();
    
    beforeEach(() => {
        jest.setSystemTime(data);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("Exibe o erro caso a data esteja no futuro", async () => {
        render(<CadastroTarefas/>);

        const dataCadastro = screen.getByLabelText(/dataCadastro/i);

        fireEvent.change(dataCadastro, {target: { value: '2025-10-08'} });
        fireEvent.blur(dataCadastro);

        const erro = await screen.findByText(/A data não pode ser no futuro./i);

        expect(erro).toBeInTheDocument();
    });
});