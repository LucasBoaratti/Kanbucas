import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TarefaModal } from "../../Components/Modais/Tarefas/TarefaModal";
import axios from "axios";

// Validações dos campos do formulário de tarefas
const validacoesTarefas = z.object({
    descricao: z.string()
        .min(1, "Descreva a tarefa, por favor.")
        .max(500, "A descrição da tarefa não pode ultrapassar 500 caracteres."),

    nome_setor: z.string() 
        .min(1, "O campo setor não pode estar vazio.")
        .max(50, "O nome do setor não pode ultrapassar 50 caracteres."),
    prioridade: z.enum(["Baixa", "Média", "Alta"]),
    data_cadastro: z.string()
        .refine((value) => { 
            const data = new Date(value);
            return data <= new Date();
        }, {
            message: "A data não pode ser no futuro.",
        }),
    status: z.enum(["A fazer", "Fazendo", "Pronto"]),
});

export function CadastroTarefas() {
    // Estado para armazenar os nomes do usuário e para exibir o modal de tarefa cadastrada
    const [nomes, setNomes] = useState([]);
    const [modalTarefa, setModalTarefa] = useState(false);

    // Configuração do react-hook-form com o zod 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacoesTarefas),
    });

    // Função de cadastro das tarefas
    async function tarefas(data) {
        const dadosTarefas = {
            ...data,
            id_usuario: Number(localStorage.getItem("idUsuario")),
        }

        try {
            await axios.post("http://127.0.0.1:8000/kanbucas/tarefas", dadosTarefas);

            setModalTarefa(true);
        }
        catch(error) {
            alert("Erro ao cadastrar tarefa. Tente novamente.");

            console.error("Erro ao cadastrar tarefa: ", error.response?.data);
        }
    }

    // Função que busca os nomes dos usuários cadastrados, após o carregamento do formulário
    useEffect(() => {
        async function get_usuarios() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/kanbucas/usuarios");
                
                setNomes(response.data);
            }
            catch(error) {
                console.log("Erro ao buscar os usuários: ", error.response?.data);
            }
        }

        get_usuarios();
    }, []);

    return (
        <main>
            <section className="containerFormulario">
                {/* Formulário para cadastrar tarefas */}
                <section className="formulario">
                    <h1 className="titulo">Cadastro de tarefas</h1>    
                    <form onSubmit={handleSubmit(tarefas)}>
                        <label htmlFor="descricao" className="label">Descrição</label> <br />
                        <textarea name="descricao" id="descricao" className="areaTexto" placeholder="Descreva a tarefa aqui" minLength={1} maxLength={500} {...register("descricao")} required ></textarea> <br />
                        {errors.descricao && <p>{errors.descricao.message}</p>}

                        <label htmlFor="setor" className="label">Setor</label> <br />
                        <input type="text" name="setor" id="setor" className="input" placeholder="Nome do setor" minLength={1} maxLength={50} {...register("nome_setor")} required /> <br />
                        {errors.nome_setor && <p>{errors.nome_setor.message}</p>}

                        <label htmlFor="prioridade" className="label">Prioridade</label> <br />
                        <select name="prioridade" id="prioridade" className="selecao" {...register("prioridade")} required>
                            <option value="Alta">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Alta</option>
                        </select> <br />
                        {errors.prioridade && <p>{errors.prioridade.message}</p>}

                        <label htmlFor="usuario" className="label">Usuário responsável</label> <br />
                        <select name="usuario" id="usuario" className="selecao" required>
                            {nomes.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                           ))}
                        </select> <br />

                        <label htmlFor="dataCadastro" className="label">Data de cadastro</label> <br />
                        <input type="date" name="dataCadastro" id="dataCadastro" className="input" placeholder="Data de cadastro" {...register("data_cadastro")} required /> <br />
                        {errors.data_cadastro && <p>{errors.data_cadastro.message}</p>}

                        <label htmlFor="status" className="label">Status</label> <br />
                        <select name="status" id="status" className="selecao" {...register("status")} required>
                            <option value="A fazer">A fazer</option>
                            <option value="Fazendo">Fazendo</option>
                            <option value="Pronto">Pronto</option>
                        </select> <br />
                        {errors.status && <p>{errors.status.message}</p>}

                        <div className="containerBotao">
                            <button type="submit" className="botao">Cadastrar</button>
                        </div>

                        <TarefaModal openModal={modalTarefa}/>
                    </form>
                </section>
            </section>
        </main>
    );
}