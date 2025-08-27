import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginModal } from "../../Components/Modais/Usuario/CadastroModal";
import axios from "axios";

// Validações do nome e do email utilizando o zod
const validacoesCadastro = z.object({
    nome: z.string()
        .min(3, "O campo nome deve possuir no mínimo 3 caracteres.")
        .max(30, "O campo nome não pode passar de 30 caracteres."),
    email: z.string()
        .min(6, "O campo email deve possuir no mínimo 6 caracteres.")
        .max(254, "O campo email não pode passar de 254 caracteres.")
        .email("O email deve conter . e @"),
});

export function CadastroUsuario() {
    // Estado que controla o modal
    const [modalLogin, setModalLogin] = useState(false);

    // Configuração do react-hook-form com o zod
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacoesCadastro),
    });

    // Função de login
    async function login(data) {
        const dadosLogin = {
            ...data,
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/kanbucas/usuarios", dadosLogin);

            // Salvando a variável nome para usar como criador da tarefa no kanban
            const { id, nome } = response.data;
            localStorage.setItem("idUsuario", id);
            localStorage.setItem("nomeUsuario", nome);

            setModalLogin(true);

            const usuario = usuari
        }
        catch(error) {
            alert("Erro ao realizar o cadastro. Tente novamente.");

            console.log("Erro ao realizar cadastro: ", error.response?.data);
        }
    }
    
    return (
        <main>
            <section className="containerCadastro">
                {/* Formulário de cadastro do usuário */}
                <section className="formularioCadastro">
                    <h1 className="titulo">Cadastro de usuários</h1>                
                    <form onSubmit={handleSubmit(login)}>
                        <label htmlFor="nome" className="label">Nome:</label> <br />
                        <input type="text" name="nome" id="nome" className="input" placeholder="Digite seu nome" minLength={3} maxLength={30} {...register("nome")} required /> <br />
                        {errors.nome && <p>{errors.nome.message}</p>}

                        <label htmlFor="email" className="label">Email:</label> <br />
                        <input type="email" name="email" id="email" className="input" placeholder="Digite seu email" minLength={6} maxLength={254} {...register("email")} required /> <br />
                        {errors.email && <p>{errors.email.message}</p>}

                        <div className="containerBotao">
                            <button type="submit" className="botao">Cadastrar</button>
                        </div>
                    </form>
                </section>
                {/* Renderizando o modal para o usuário */}
                <LoginModal openModal={modalLogin}/>
            </section>
        </main>
    );
}