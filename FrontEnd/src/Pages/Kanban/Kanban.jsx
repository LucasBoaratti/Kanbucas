import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { CardTarefa } from "../../Components/Cards/CardTarefa";
import { DeletarTarefaModal } from "../../Components/Modais/Tarefas/DeletarTarefaModal";
import { DndContext } from "@dnd-kit/core"; //Área que permite o uso do drag in drop
import axios from "axios";

export function Kanban() {
    // Estados dos dados das tarefas e modais
    const [tarefas, setTarefas] = useState([]);
    const [modalDeletarTarefa, setModalDeletarTarefa] = useState(false);
    const [idTarefa, setIdTarefa] = useState(null);

    const {setNodeRef: setAFazerRef } = useDroppable( { id: "A fazer" });
    const {setNodeRef: setFazendoRef } = useDroppable( { id: "Fazendo" });
    const {setNodeRef: setProntoRef } = useDroppable( { id: "Pronto" });

    // Função que pega as tarefas a partir da URL das tarefas
    async function get_tarefas() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/kanbucas/tarefas");

            setTarefas(response.data);
        }
        catch(error) {
            console.error("Erro ao buscar tarefas: ", error.response?.data);
        }
    }

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
    
    // Função que abre o modal de excluir tarefa, passando o id da tarefa
    function abrir_modal(id) {
        setIdTarefa(id);
        setModalDeletarTarefa(true);
    }

    // Função que controla os cards para um drag and drop
    async function handleDragEnd(event) {
        const { active, over } = event;

        console.log("Ativo: ", active);
        console.log("over: ",over);

        if (over && active) {
            try {
                const tarefasId = parseInt(active.id);

                const novaColuna = over.id; //Onde ela foi solta

                await axios.patch(`http://127.0.0.1:8000/kanbucas/tarefas/${tarefasId}`, {
                    status: novaColuna,
                });

                await get_tarefas();
            } 
            catch(error) {
                console.error("Erro ao modificar tarefa: ", error.response?.data);
            }   
        }
    }

    // Renderizando os dados assim que o card é montado
    useEffect(() => {
        get_tarefas();
    }, []);

    return (
        <main>
            <DndContext onDragEnd={handleDragEnd}>
                <h1 className="titulo">Tarefas - Kanbucas</h1>
                {/* Card de tarefas */}
                <section className="kanban">
                    {/* A fazer */}
                    <section className="aFazer" ref={setAFazerRef}>
                        <h2 className="tituloAFazer">A fazer</h2>
                        {/* Renderizando o card da tarefa com o status a fazer */}
                        {tarefas.filter(task => task.status === "A fazer").map((tarefa) => (
                            <CardTarefa key={tarefa.id} tarefa={tarefa} statusTarefa={patch_status_tarefa} atualizarCards={get_tarefas} abrirModal={abrir_modal} />
                        ))}
                    </section>
                    {/* Fazendo */}
                    <section className="fazendo" ref={setFazendoRef}>
                        <h2 className="tituloFazendo">Fazendo</h2>
                        {/* Renderizando o card da tarefa com o status fazendo */}
                        {tarefas.filter(task => task.status === "Fazendo").map((tarefa) => (
                            <CardTarefa key={tarefa.id} tarefa={tarefa} statusTarefa={patch_status_tarefa} atualizarCards={get_tarefas} abrirModal={abrir_modal} />
                        ))}
                    </section>
                    {/* Pronto */}
                    <section className="pronto" ref={setProntoRef}>
                        <h2 className="tituloPronto">Pronto</h2>
                        {/* Renderizando o card da tarefa com o status pronto */}
                        {tarefas.filter(task => task.status === "Pronto").map((tarefa) => (
                            <CardTarefa key={tarefa.id} tarefa={tarefa} statusTarefa={patch_status_tarefa} atualizarCards={get_tarefas} abrirModal={abrir_modal} />
                        ))}
                    </section>
                    {/* Renderizando o modal de deletar tarefa */}
                    <DeletarTarefaModal openModal={modalDeletarTarefa} closeModal={() => setModalDeletarTarefa(false)} atualizarCards={get_tarefas} idTarefa={idTarefa} />
                </section>
            </DndContext>
        </main>
    );
}