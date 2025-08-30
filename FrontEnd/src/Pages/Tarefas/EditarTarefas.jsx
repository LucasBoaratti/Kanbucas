import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditarTarefaModal } from "../../Components/Modais/Tarefas/EditarTarefaModal";
import axios from "axios";

// Validações dos campos do formulário de editar tarefas
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

export function EditarTarefas() {
    // Estados dos componentes da página
    const [idUsuario, setIdUsuario] = useState("");
    const [nomes, setNomes] = useState([]);
    const [modalEditarTarefa, setModalEditarTarefa] = useState(false);

    // Configuração do formulário com o react-hook-form e zod
    const {
        register, 
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacoesTarefas),
    });
    
    // Função de editar tarefas
    async function put_tarefas(data) {
        const dadosFormulario = {
            ...data,
            id_usuario: idUsuario,
        }
        const idTarefa = localStorage.getItem("idTarefa");
        
        try {
            await axios.put(`http://127.0.0.1:8000/kanbucas/tarefas/${idTarefa}`, dadosFormulario);

            setModalEditarTarefa(true);
        }
        catch(error) {
            console.error("Erro ao editar tarefa: ", error.response?.data);

            alert("Não foi possível atualizar a tarefa. Tente novamente.");
        }
    }

    // Buscando os dados prenchidos da tarefa, assim que o componente do formulário ser renderizado
    useEffect(() => {
        setValue("descricao", localStorage.getItem("descricao") || "");
        setValue("nome_setor", localStorage.getItem("setor") || "");
        setValue("prioridade", localStorage.getItem("prioridade") || "");
        setValue("usuario", localStorage.getItem("usuario") || "");
        setValue("data_cadastro", localStorage.getItem("data") || "");
        setValue("status", localStorage.getItem("status") || "");

        // Buscando o nome do usuário preenchido
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
            {/* Formulário de editar tarefa */}
            <section className="containerFormulario">
                <section className="formulario">
                    <h1 className="titulo">Edite a tarefa aqui</h1>
                    <form onSubmit={handleSubmit(put_tarefas)}>
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
                        <select name="usuario" id="usuario" className="selecao" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} required>
                            {nomes.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                            ))}
                        </select> <br />

                        <label htmlFor="dataCadastro" className="label">Data de cadastro</label> <br />
                        <input type="date" name="dataCadastro" id="dataCadastro" className="input" {...register("data_cadastro")} required /> <br />
                        {errors.data_cadastro && <p>{errors.data_cadastro.message}</p>}

                        <label htmlFor="status" className="label">Status</label> <br />
                        <select name="status" id="status" className="selecao" {...register("status")} required>
                            <option value="A fazer">A fazer</option>
                            <option value="Fazendo">Fazendo</option>
                            <option value="Pronto">Pronto</option>
                        </select> <br />
                        {errors.status && <p>{errors.status.message}</p>}

                        <div className="containerBotao">
                            <button type="submit" className="botao">Editar</button>
                        </div>

                        <EditarTarefaModal openModal={modalEditarTarefa}/>
                    </form>
                </section>
            </section>
        </main>
    );
}