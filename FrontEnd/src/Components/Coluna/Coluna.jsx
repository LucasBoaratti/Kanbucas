import { useDroppable } from "@dnd-kit/core";
import { CardTarefa } from "../Cards/CardTarefa";

export function Coluna({ id, tarefas, statusTarefa, atualizarCards, abrirModal }) {
    //Referenciando o card da coluna pelo seu id
    const { setNodeRef } = useDroppable({ id });

    return (
        <main>
            {/* A estilização do card funciona de acordo com o status da tarefa */}
            <section className={id.replace(" ", "")} ref={setNodeRef}>
                <h2 className="titulo">{id}</h2>
                {/* Renderizando o card da tarefa de acordo com o seu status */}
                {tarefas.filter((tarefa) => tarefa.status === id).map((tarefa) => (
                    <CardTarefa key={tarefa.id} tarefa={tarefa} statusTarefa={statusTarefa} atualizarCards={atualizarCards} abrirModal={abrirModal} />
                ))}
            </section>
        </main>
    );
}