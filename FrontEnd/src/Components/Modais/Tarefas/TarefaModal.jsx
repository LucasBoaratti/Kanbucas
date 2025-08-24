import { useNavigate } from "react-router-dom";

export function TarefaModal({ openModal }) {
    // Verificação do modal aberto. Serve para ele não ficar aberto ao renderizar uma tela
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        // Modal
        <section className="containerModal">
            <div className="modal">
                <h1 className="tituloModal">Tarefa cadastrada com sucesso!</h1>
                <div className="containerBotao">
                    <button type="button" onClick={() => navigate("/kanban")} className="botao">Avançar</button>
                </div>
            </div>
        </section>
    );
}