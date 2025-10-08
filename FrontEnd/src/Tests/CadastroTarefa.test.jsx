import { render, screen, fireEvent } from "@testing-library/react";
import { CadastroTarefas } from "../Pages/Tarefas/CadastroTarefas";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

// Caso de teste para verificar se os campos estão presentes
describe("Cadastro de tarefas", () => {
    it("Exibe os campos do cadastro de tarefas", () => {
        render(<CadastroTarefas/>);

        const descricao = screen.getByLabelText(/descrição/i);
        const nome_setor = screen.getByLabelText(/setor/i);
        const prioridade = screen.getByLabelText(/prioridade/i);
        const data_cadastro = screen.getByLabelText(/data de cadastro/i);
        const status = screen.getByLabelText(/status/i);
        const botao = screen.getByRole("button", {name: /Cadastrar/i});

        expect(descricao).toBeTruthy();
        expect(nome_setor).toBeTruthy();
        expect(prioridade).toBeTruthy();
        expect(data_cadastro).toBeTruthy();
        expect(status).toBeTruthy();
        expect(botao).toBeTruthy();
    });
});

// Caso de teste para verificar se o usuário digitou nada na descrição da tarefa
describe("Teste para verificar se há algo escrito na descrição da tarefa", () => {
    it("Exibe o erro falando pro usuário digitar algo para a descrição da tarefa", async () => {
        render(<CadastroTarefas/>);

        const descricao = screen.getByLabelText(/descrição/i);

        fireEvent.change(descricao, {target: { value: "" } });
        fireEvent.blur(descricao);

        const botao = screen.getByRole("button", { name: /cadastrar/i });
        fireEvent.click(botao);

        screen.debug();

        const erro = await screen.findByTestId("erroDescricao");
        expect(erro).toHaveTextContent("Descreva a tarefa, por favor.");
    });
});

// Caso de teste para verificar se o usuário digitou mais de 100 caracteres na descrição da tarefa
describe("Teste para verificar se o usuário digitou mais de 100 caracteres na descrição da tarefa", () => {
    it("Exibe o erro caso o usuário digite mais de 100 caracteres na descrição da tarefa", async () => {
        render(<CadastroTarefas/>);

        const descricao = screen.getByLabelText(/descrição/i);

        fireEvent.change(descricao, {target: { value: "Tarefa que representa uma coisa muito importante...".repeat(101) } });
        fireEvent.blur(descricao);

        const botao = screen.getByRole("button", { name: /cadastrar/i });
        fireEvent.click(botao);

        screen.debug();

        const erro = await screen.findByTestId("erroDescricao");
        expect(erro).toHaveTextContent("A descrição da tarefa não pode ultrapassar 100 caracteres.");
    });
});

// Caso de teste para verificar se o usuário digitou nada no campo setor
describe("Teste para verificar se há algo escrito no campo setor", () => {
    it("Exibe o erro falando pro usuário digitar algo no campo setor", async () => {
        render(<CadastroTarefas/>);

        const nome_setor = screen.getByLabelText(/setor/i);

        fireEvent.change(nome_setor, {target: { value: "" } });
        fireEvent.blur(nome_setor);

        const botao = screen.getByRole("button", { name: /cadastrar/i });
        fireEvent.click(botao);

        screen.debug();

        const erro = await screen.findByTestId("erroSetor");
        expect(erro).toHaveTextContent("O campo setor não pode estar vazio.");
    });
});

// Caso de teste para verificar se o usuário digitou mais de 50 caracteres no campo setor
describe("Teste para verificar se o usuário digitou mais de 50 caracteres no campo setor", () => {
    it("Exibe o erro caso o usuário digite mais de 50 caracteres no campo setor", async () => {
        render(<CadastroTarefas/>);

        const nome_setor = screen.getByLabelText(/setor/i);

        fireEvent.change(nome_setor, {target: { value: "SENAI".repeat(51) } });
        fireEvent.blur(nome_setor);

        const botao = screen.getByRole("button", { name: /cadastrar/i });
        fireEvent.click(botao);

        screen.debug();

        const erro = await screen.findByTestId("erroSetor");
        expect(erro).toHaveTextContent("O nome do setor não pode ultrapassar 50 caracteres.");
    });
});

// Caso de teste para verificar se um campo da seção de prioridade foi escolhido
describe("Verificando se o campo prioridade foi selecionado", () => {
    it("Exibe o erro se nenhuma prioridade for escolhida", async () => {
        render(<CadastroTarefas/>);

        const prioridade = screen.getByLabelText(/prioridade/i);

        fireEvent.blur(prioridade);

        const botao = screen.getByRole("button", { name: /cadastrar/i });
        fireEvent.click(botao);

        screen.debug();

        const erro = await screen.findByTestId("erroPrioridade");
        expect(erro).toHaveTextContent("Escolha ao menos uma prioridade, por favor.");
    });
});

// Caso de teste para verificar se a data escolhida pelo usuário não esteja no futuro
describe("Validação de data no futuro", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Exibe o erro caso a data esteja no futuro", async () => {
        render(<CadastroTarefas/>);

        const dataCadastro = screen.getByLabelText(/data de cadastro/i);

        fireEvent.change(dataCadastro, {target: { value: '9999-01-01' } });
        fireEvent.blur(dataCadastro);

        const botao = screen.getByRole("button", { name: /cadastrar/i });
        fireEvent.click(botao);

        screen.debug();

        const erro = await screen.findByTestId("erroData");
        expect(erro).toHaveTextContent("A data não pode ser no futuro.");
    });
});

// Caso de teste para verificar se um campo de status foi escolhido
describe("Verificando se um campo de prioridade foi escolhido", () => {
    it("Exibe o erro se nenhum status foi escolhido", async () => {
        render(<CadastroTarefas/>);

        const status = screen.getByLabelText(/status/i);

        fireEvent.blur(status);

        const botao = screen.getByRole("button", { name: /cadastrar/i });
        fireEvent.click(botao);

        screen.debug();

        const erro = await screen.findByTestId("erroStatus");
        expect(erro).toHaveTextContent("Escolha ao menos um status, por favor.");
    });
});