import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CardTarefa({ tarefa, statusTarefa, atualizarCards, abrirModal }) {
    // Estado dos status das tarefas
    const [status, setStatus] = useState(tarefa.status);

    // Navegação entre páginas
    const navigate = useNavigate();

    // Função para arrumar a data de cadastro da tarefa para DD/MM/AAAA
    function data_arrumada() {
        const data = new Date();

        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0");
        const ano = data.getFullYear();
        
        return `${dia}/${mes}/${ano}`;
    }

    return (
        // Card da tarefa
        <section className="cards">
            <p className="paragrafo"><b>Descrição:</b> {tarefa.descricao}</p>
            <p className="paragrafo"><b>Setor:</b> {tarefa.nome_setor}</p>
            <p className="paragrafo"><b>Prioridade:</b> {tarefa.prioridade}</p>
            <p className="paragrafo"><b>Responsável:</b> {tarefa.nome_usuario}</p>
            <p className="paragrafo"><b>Data de cadastro:</b> {data_arrumada(tarefa.data_cadastro)}</p>
            <div className="containerSelecao">
                <select name="status" id="status" className="statusTarefas" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="A fazer">A fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Pronto">Pronto</option>
                </select>
                <button type="button" className="botaoStatus" onClick={() => statusTarefa(tarefa.id, status)}>Alterar status</button>
            </div>
            <div className="containerBotoes">
                <button type="button" className="botao" onClick={() => {
                    // Adicionando os campos das tarefas para aparecer no formulário de editar tarefas
                    localStorage.setItem("idTarefa", tarefa.id);
                    localStorage.setItem("descricao", tarefa.descricao);
                    localStorage.setItem("setor", tarefa.nome_setor);
                    localStorage.setItem("prioridade", tarefa.prioridade.toString());
                    localStorage.setItem("usuario", tarefa.nome_usuario.toString());
                    localStorage.setItem("data", tarefa.data_cadastro);
                    localStorage.setItem("status", tarefa.status.toString());
                    
                    navigate("/editarTarefa");
                }}>Editar</button>
                <button type="button" className="botao" onClick={() => {
                    // Abrindo o modal a partir do ID da tarefa
                    abrirModal(tarefa.id);
                }}>Excluir</button>
            </div>
        </section>
    );
}