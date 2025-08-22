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
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacoesCadastro),
    });

    async function login(data) {
        const data = {
            ...data,
        }

        try {
            await axios.post("http://127.0.0.1:8000/kanbucas/usuarios", data);

            setCadastro();
        }
        catch(error) {
            alert("Erro ao realizar cadastro. Verifique os campos e tente novamente.");

            console.log("Erro ao realizar cadastro: ", error.response?.data);

            setNome("");
            setEmail("");
        }
    }
    
    return (
        <main>
            <section className="containerCadastro">
                {/* Formulário de cadastro do usuário */}
                <section className="formularioCadastro">
                    <h1 className="titulo">Cadastro de usuários</h1>
                    {cadastro.map((data, index) => (
                        <form key={index} onSubmit={handleSubmit(login)}>
                            <label htmlFor="nome" className="label">Nome:</label> <br />
                            <input type="text" name="nome" id="nome" className="input" placeholder="Digite seu nome" minLength={1} maxLength={30} value={nome} onChange={(e) => setNome(e.target.value)} {...register("nome")} /> <br />
                            {errors.nome && <p>{errors.nome.message}</p>}

                            <label htmlFor="email" className="label">Email:</label> <br />
                            <input type="text" name="email" id="email" className="input" placeholder="Digite seu email" minLength={6} maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} {...register("email")} /> <br />
                            {errors.email && <p>{errors.email.message}</p>}

                            <div className="containerBotao">
                                <button type="submit" className="botao">Cadastrar</button>
                            </div>
                        </form>
                    ))}
                </section>
            </section>
        </main>
    );
}