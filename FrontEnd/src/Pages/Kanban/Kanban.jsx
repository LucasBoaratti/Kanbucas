import { useEffect, useState } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

export function Kanban() {
    // Estados dos dados das tarefas
    const [tarefas, setTarefas] = useState([]);
    const [tarefasFazendo, setTarefasFazendo] = useState(false);

    // Função que pega as tarefas a partir da URL das tarefas
    async function get_tarefas() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/kanbucas/tarefas");

            setTarefas(response.data);

            localStorage.setItem("idTarefa", response.data.id);
        }
        catch(error) {
            console.error("Erro ao buscar tarefas: ", error.response?.data);
        }
    }

    // Renderizando os dados assim que o card é montado
    useEffect(() => {
        get_tarefas();

        // Filtrando o tipo de status
        const aFazer = tarefas.filter(tarefa => tarefa.status === "A fazer");
        const fazendo = tarefas.filter(tarefa => tarefa.status === "Fazendo");
        const pronto = tarefas.filter(tarefa => tarefa.status === "Pronto");
    }, []);

    // Função para atualizar o status da tarefa 
    async function patch_status_tarefa(status) {
        const idTarefa = localStorage.getItem("idTarefa");

        try {
            await axios.patch(`http://127.0.0.1:8000/kanbucas/tarefas/${idTarefa}`, {
                status: status,
            });

            get_tarefas();
        }
        catch(error) {
            console.error("Erro ao atualizar status da tarefa: ", error.response?.data);
        }
    }

    // Função que muda o card para a aba escolhida pelo status
    function CardTarefa({ tarefa, statusTarefa }) {
        const [status, setStatus] = useState(tarefa.status);

        return (
            <div className="cardAFazer">
                <p className="paragrafo"><b>Descrição:</b> {tarefa.descricao}</p>
                <p className="paragrafo"><b>Setor:</b> {tarefa.nome_setor}</p>
                <p className="paragrafo"><b>Prioridade:</b> {tarefa.prioridade}</p>
                <p className="paragrafo"><b>Responsável:</b> {tarefa.nome_usuario}</p>
                <div className="containerSelecao">
                    <select name="status" id="status" className="statusTarefas" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="status">A fazer</option>
                        <option value="Fazendo">Fazendo</option>
                        <option value="Pronto">Pronto</option>
                    </select>
                    <button type="button" className="botaoStatus" onClick={() => patch_status_tarefa(tarefa.id, status)}>Alterar status</button>
                </div>
            </div>
        );
    }

    return (
        <main>
            <h1 className="titulo">Tarefas - KanBucas</h1>
            {/* Card de tarefas */}
            <section className="kanban">
                {/* A fazer */}
                <section className="aFazer">
                    <h2 className="tituloAFazer">A fazer</h2>
                    {tarefas.map((tarefa, index) => (
                        <div key={index} className="cardAFazer">
                            <p className="paragrafo"><b>Descrição:</b> {tarefa.descricao}</p>
                            <p className="paragrafo"><b>Setor:</b> {tarefa.nome_setor}</p>
                            <p className="paragrafo"><b>Prioridade:</b> {tarefa.prioridade}</p>
                            <p className="paragrafo"><b>Responsável:</b> {tarefa.nome_usuario}</p>

                            <div className="containerSelecao">
                                <select name="status" id="status" className="statusTarefas">
                                    <option value="status">{tarefa.status}</option>
                                    <option value="Fazendo">Fazendo</option>
                                    <option value="Pronto">Pronto</option>
                                </select>
                                <button type="button" className="botaoStatus" onClick={() => setTarefasFazendo(!tarefasFazendo)}>Alterar status</button>
                            </div>

                            <div className="containerBotoes">
                                <button type="button" className="botao">Editar</button>
                                <button type="button" className="botao">Excluir</button>
                            </div>
                        </div>
                    ))}
                </section>
                {/* Fazendo */}
                <section className="fazendo">
                    <h2 className="tituloFazendo">Fazendo</h2>
                </section>
                {/* Pronto */}
                <section>

                </section>
            </section>
        </main>
    );
}