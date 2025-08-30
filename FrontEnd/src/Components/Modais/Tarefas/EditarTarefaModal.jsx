import { useNavigate } from "react-router-dom";

export function EditarTarefaModal({ openModal }) {
    // Verificação do modal aberto. Serve para ele não ficar aberto ao renderizar uma tela
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        // Modal de editar tarefas
        <section className="containerModalTarefa">
            <div className="modalTarefa">
                <h1 className="tituloModal">Tarefa editada com sucesso!</h1>
                <div className="containerBotao">
                    <button type="button" onClick={() => navigate("/kanban")} className="botao">Avançar</button>
                </div>
            </div>
        </section>
    );
}