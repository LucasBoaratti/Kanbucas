import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

const validacoesCadastro = z.object({
    nome: z.string()
        .min(1, "O campo nome deve ser preenchido.")
        .max(30, "O campo nome não pode passar de 30 caracteres."),
    email: z.string()
        .min(6, "O campo email deve possuir no mínimo 6 caracteres.")
        .max(254, "O campo email não pode passar de 254 caracteres.")
        .email("O email deve conter . e @"),
});

export function CadastroUsuario() {
    const [cadastro, setCadastro] = useState();
    
    return (
        <main>
            <section className="containerCadastro">
                {/* Formulário de cadastro do usuário */}
                <section className="formularioCadastro">
                    <h1 className="titulo">Cadastro de usuários</h1>
                    <form>
                        <label htmlFor="nome" className="label">Nome:</label> <br />
                        <input type="text" name="nome" id="nome" className="input" placeholder="Digite seu nome" minLength={1} maxLength={30} /> <br />

                        <label htmlFor="email" className="label">Email:</label> <br />
                        <input type="text" name="email" id="email" className="input" placeholder="Digite seu email" minLength={6} maxLength={254} /> <br />

                        <div className="containerBotao">
                            <button type="submit" className="botao">Cadastrar</button>
                        </div>
                    </form>
                </section>
            </section>
        </main>
    );
}