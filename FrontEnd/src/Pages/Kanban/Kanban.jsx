import { useEffect, useState } from "react";
import { CardTarefa } from "../../Components/Cards/CardTarefa";
import { DeletarTarefaModal } from "../../Components/Modais/Tarefas/DeletarTarefaModal";
import axios from "axios";

export function Kanban() {
    // Estados dos dados das tarefas
    const [tarefas, setTarefas] = useState([]);
    const [tarefasAFazer, setTarefasAFazer] = useState([]);
    const [tarefasFazendo, setTarefasFazendo] = useState([]);
    const [tarefasProntas, setTarefasProntas] = useState([]);
    const [modalDeletarTarefa, setModalDeletarTarefa] = useState(false);
    const [idTarefa, setIdTarefa] = useState(null);

    // Função que pega as tarefas a partir da URL das tarefas
    async function get_tarefas() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/kanbucas/tarefas");

            setTarefas(response.data);
            // Setando o estado com a filtragem do tipo de status
            setTarefasAFazer(response.data.filter(tarefa => tarefa.status === "A fazer"));
            setTarefasFazendo(response.data.filter(tarefa => tarefa.status === "Fazendo"));
            setTarefasProntas(response.data.filter(tarefa => tarefa.status === "Pronto"));
        }
        catch(error) {
            console.error("Erro ao buscar tarefas: ", error.response?.data);
        }
    }

    // Renderizando os dados assim que o card é montado
    useEffect(() => {
        get_tarefas();
    }, []);

    // Função para atualizar apenas o status da tarefa
    async function patch_status_tarefa(idTarefa, status) {
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
    
    function abrir_modal(id) {
        setIdTarefa(id);
        setModalDeletarTarefa(true);
    }

    return (
        <main>
            <h1 className="titulo">Tarefas - Kanbucas</h1>
            {/* Card de tarefas */}
            <section className="kanban">
                {/* A fazer */}
                <section className="aFazer">
                    <h2 className="tituloAFazer">A fazer</h2>
                    {/* Renderizando o card da tarefa com o status a fazer */}
                    {tarefasAFazer.map((tarefa) => (
                        <CardTarefa key={tarefa.id} tarefa={tarefa} statusTarefa={patch_status_tarefa} atualizarCards={get_tarefas} abrirModal={abrir_modal} />
                    ))}
                </section>
                {/* Fazendo */}
                <section className="fazendo">
                    <h2 className="tituloFazendo">Fazendo</h2>
                    {/* Renderizando o card da tarefa com o status fazendo */}
                    {tarefasFazendo.map((tarefa) => (
                        <CardTarefa key={tarefa.id} tarefa={tarefa} statusTarefa={patch_status_tarefa} atualizarCards={get_tarefas} abrirModal={abrir_modal} />
                    ))}
                </section>
                {/* Pronto */}
                <section className="pronto">
                    <h2 className="tituloPronto">Pronto</h2>
                    {/* Renderizando o card da tarefa com o status pronto */}
                    {tarefasProntas.map((tarefa) => (
                        <CardTarefa key={tarefa.id} tarefa={tarefa} statusTarefa={patch_status_tarefa} atualizarCards={get_tarefas} abrirModal={abrir_modal} />
                    ))}
                </section>
                {/* Renderizando o modal de deletar tarefa */}
                <DeletarTarefaModal openModal={modalDeletarTarefa} closeModal={() => setModalDeletarTarefa(false)} atualizarCards={get_tarefas} idTarefa={idTarefa} />
            </section>
        </main>
    );
}