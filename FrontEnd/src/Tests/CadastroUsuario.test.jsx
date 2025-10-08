import { render, screen, fireEvent } from "@testing-library/react";
import { CadastroUsuario } from "../Pages/Usuario/CadastroUsuario";
import { describe, it, expect } from "vitest";

// Caso de teste para verificar a presença dos campos essenciais
describe("Cadastro de usuário", () => {
    it("Exibe os campos do cadastro de usuário", () => {
        render(<CadastroUsuario/>);

        const nome = screen.getByLabelText(/nome/i);
        const email = screen.getByLabelText(/email/i);
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

        fireEvent.change(nome, { target: { value: "Lucas123" } });
        fireEvent.blur(nome);

        const botao = screen.getByRole("button", { name: /cadastrar/i });
        fireEvent.click(botao);

        screen.debug();
        
        const erro = await screen.findByTestId("erroNome");
        expect(erro).toHaveTextContent("Digite apenas letras, por favor.");
    });
});

// Caso para validar se o nome possui no mínimo 3 letras
describe("Nome com no mínimo de 3 caracteres", () => {
    it("Exibe o erro se o usuário digitar duas ou menos letras no campo nome", async () => {
        render(<CadastroUsuario/>);

        const nome = screen.getByLabelText(/nome/i);

        fireEvent.change(nome, {target: { value: "Lu" } });
        fireEvent.blur(nome);
        
        const botao = screen.getByRole("button", { name: /Cadastrar/i });
        fireEvent.click(botao);

        const erro = await screen.findByTestId("erroNome");
        expect(erro).toHaveTextContent("O campo nome deve possuir no mínimo 3 caracteres.");
    });
});

// Caso para validar se o nome passou de 30 caracteres
describe("Nome passando de 30 caracteres", () => {
    it("Exibe o erro se o usuário digitar mais de 30 caracteres", async () => {
        render(<CadastroUsuario/>);

        const nome = screen.getByLabelText(/nome/i);

        fireEvent.change(nome, {target: { value: "Lucas".repeat(31) } });
        fireEvent.blur(nome);
        
        const botao = screen.getByRole("button", { name: /Cadastrar/i });
        fireEvent.click(botao);

        const erro = await screen.findByTestId("erroNome");
        expect(erro).toHaveTextContent("O campo nome não pode passar de 30 caracteres.");
    });
});

// Caso de teste para validar se o email contém . e @
describe("Email sem . e @", () => {
    it("Exibe o erro caso o campo email não tenha . e @", async () => {
        render(<CadastroUsuario/>);

        const email = screen.getByLabelText(/email/i);

        fireEvent.change(email, {target: { value: "lucashenrique" } });
        fireEvent.blur(email);
        
        const botao = screen.getByRole("button", { name: /Cadastrar/i });
        fireEvent.click(botao);

        const erro = await screen.findByTestId("erroEmail");
        expect(erro).toHaveTextContent("Email inválido. Tente novamente.");
    });
});

// Caso de teste para verificar se o email possui no mínimo 6 caracteres
describe("Email com menos de 6 caracteres", () => {
    it("Exibe o erro caso o campo email possua menos de 6 caracteres", async () => {
        render(<CadastroUsuario/>);

        const email = screen.getByLabelText(/email/i);

        fireEvent.change(email, {target: { value: "l@e.c" } });
        fireEvent.blur(email);
        
        const botao = screen.getByRole("button", { name: /Cadastrar/i });
        fireEvent.click(botao);

        const erro = await screen.findByTestId("erroEmail");
        expect(erro).toHaveTextContent("O campo email deve possuir no mínimo 6 caracteres.");
    });
});

// Caso de teste para verificar se o email possui mais de 254 caracteres
describe("Email com mais de 254 caracteres", () => {
    it("Exibe o erro caso o campo email possui mais de 254 caracteres", async () => {
        render(<CadastroUsuario/>);

        const email = screen.getByLabelText(/email/i);

        fireEvent.change(email, {target: { value: "a".repeat(255) + "@email.com" } });
        fireEvent.blur(email);
        
        const botao = screen.getByRole("button", { name: /Cadastrar/i });
        fireEvent.click(botao);

        const erro = await screen.findByTestId("erroEmail");
        expect(erro).toHaveTextContent("O campo email não pode passar de 254 caracteres.");
    });
});