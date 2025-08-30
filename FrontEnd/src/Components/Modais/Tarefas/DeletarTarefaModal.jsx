import axios from "axios";

export function DeletarTarefaModal({ openModal, closeModal, atualizarCards, idTarefa }) {
    // Verificação do modal aberto. Serve para ele não ficar aberto ao renderizar uma tela
    if(!openModal) {
        return null;
    }

    // Função para deletar a tarefa
    async function delete_tarefas() {
        try {
            await axios.delete(`http://127.0.0.1:8000/kanbucas/tarefas/${idTarefa}`);

            alert("Tarefa deletada com sucesso!");
            closeModal();
            await atualizarCards();
        }
        catch(error) {
            console.error("Erro ao deletar tarefa: ", error.response?.data);

            alert("Erro ao deletar tarefa. Tente novamente.");
        }
    }

    return (
        // Modal de deletar tarefa
        <section className="containerModalTarefa">
            <div className="modalTarefa">
                <h1 className="tituloModal">Tem certeza que deseja deletar essa tarefa?</h1>
                <div className="containerBotoes">
                    <button type="button" onClick={delete_tarefas} className="botao">Sim</button>
                    <button type="button" onClick={closeModal} className="botao">Não</button>
                </div>
            </div>
        </section>
    );
}