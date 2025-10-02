import { render, screen, fireEvent } from "@testing-library/react";
import { CadastroUsuario } from "../Pages/Usuario/CadastroUsuario";
import { describe, it, expect } from "vitest";

// Caso de teste para verificar a presença dos campos essenciais
describe("Cadastro de usuário", () => {
    it("Exibe os campos", () => {
        render(<CadastroUsuario/>);

        const nome = screen.getByLabelText(/Nome/i);
        const email = screen.getByLabelText(/Email/i);
        const botao = screen.getByRole("button", {name: /Cadastrar/i});

        expect(nome).toBeTruthy();
        expect(email).toBeTruthy();
        expect(botao).toBeTruthy();
    });
});

// Caso de teste para validar se o nome contém números
describe("Nome com números", () => {
    it("Exibe o erro caso o campo nome tenha números", async () => {
        render(<CadastroUsuario/>);

        const nome = screen.getByLabelText(/nome/i);

        fireEvent.change(nome, {target: { value: "Lucas123" } });
        fireEvent.blur(nome);

        const erro = await screen.findByText(/Digite apenas letras, por favor./i);

        expect(erro).toBeInTheDocument();
    });
});

// Caso para validar se o nome possui no mínimo 3 letras
describe("Nome com no mínimo de 3 caracteres", () => {
    it("Exibe o erro se o usuário digitar duas ou menos letras no campo nome", async () => {
        render(<CadastroUsuario/>);

        const nome = screen.getByLabelText(/nome/i);

        fireEvent.change(nome, {target: { value: "Lu" } });
        fireEvent.blur(nome);

        const erro = await screen.findByText(/O campo nome deve possuir no mínimo 3 caracteres./i);

        expect(erro).toBeInTheDocument();
    });
});

// Caso para validar se o nome passou de 30 caracteres
describe("Nome passando de 30 caracteres", () => {
    it("Exibe o erro se o usuário digitar mais de 30 caracteres", async () => {
        render(<CadastroUsuario/>);

        const nome = screen.getByLabelText(/nome/i);

        fireEvent.change(nome, {target: { value: "Lucas".repeat(31) } });
        fireEvent.blur();

        const erro = await screen.findByText(/O campo nome não pode passar de 30 caracteres./i);

        expect(erro).toBeInTheDocument();
    });
});

// Caso de teste para validar se o email contém . e @
describe("Email sem . e @", () => {
    it("Exibe o erro caso o campo email não tenha . e @", async () => {
        render(<CadastroUsuario/>);

        const email = screen.getByLabelText(/email/i);

        fireEvent.change(email, {target: { value: "lucasmarques" } });
        fireEvent.blur(email);

        const erro = await screen.findByText(/Email inválido. Tente novamente./i);

        expect(erro).toBeInTheDocument();
    });
});