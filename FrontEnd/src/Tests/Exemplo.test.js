// Arquivo que gerencia os testes automatizados

import { describe, it, expect } from "vitest";

// Casos de teste
describe("Matemática básica. #saudades", () => {
    // Cada IT é um cenário de teste, não um palhaço :)
    it("Verificar soma 2 + 2", () => {
        expect(2 + 2).toBe(4);
    });

    it("Verificar multiplicação 3 * 3", () => {
        expect(3 * 3).toBe(9);
    });
});

//Obs:
//Para que isso funcione é necessário alterar o vite.config.js e o package.json
//A alteração lá deve ser a adição das linhas que estão comentadas no arquivo :)

//Créditos do arquivo: GABS - Gabriela Alejandra Bergamine Dos Santos - DS15