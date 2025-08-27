import { useState } from "react";

export function CardTarefa({ tarefa, statusTarefa }) {
    // Estado dos status das tarefas
    const [status, setStatus] = useState(tarefa.status);

    return (
        // Card da tarefa
        <section className="cards">
            <p className="paragrafo"><b>Descrição:</b> {tarefa.descricao}</p>
            <p className="paragrafo"><b>Setor:</b> {tarefa.nome_setor}</p>
            <p className="paragrafo"><b>Prioridade:</b> {tarefa.prioridade}</p>
            <p className="paragrafo"><b>Responsável:</b> {tarefa.nome_usuario}</p>
            <div className="containerSelecao">
                <select name="status" id="status" className="statusTarefas" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="A fazer">A fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Pronto">Pronto</option>
                </select>
                <button type="button" className="botaoStatus" onClick={() => statusTarefa(tarefa.id, status)}>Alterar status</button>
            </div>
            <div className="containerBotoes">
                <button type="button" className="botao">Editar</button>
                <button type="button" className="botao">Excluir</button>
            </div>
        </section>
    );
}