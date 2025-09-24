import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core"; //Biblioteca que permite o drag in drop - itens que são movimentados

export function CardTarefa({ tarefa, statusTarefa, atualizarCards, abrirModal }) {
    // Estado dos status das tarefas e do id da tarefa
    const [status, setStatus] = useState(tarefa.status);

    // Inserifno o controle atual do meu card
    // setNodeRef -> É o que liga o elemento arrastável ao DOM. Ele que dá acesso ao elemento
    // listeners -> É o fofoqueiro. Ele fica escutando quando a ação termina (não foi necessário aqui, po)
    // atributes -> É o que diz que pode ser movimentado pelo teclado ou mouse
    // transform -> É o que dá a sensação de arrasto.
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
    } = useDraggable({
        id: String(tarefa.id),
    });

    // Controla as posições do plano cartesiano. Ele pega as coordenadas X e Y e vai dar a impressão ao usuário do movimento do mouse
    const style = transform 
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

    // Navegação entre páginas
    const navigate = useNavigate();

    // Função para arrumar a data de cadastro da tarefa para DD/MM/AAAA
    function data_arrumada(dataString) {
        const data = new Date(dataString);

        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0");
        const ano = data.getFullYear();
        
        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        setStatus(tarefa.status);
    }, [tarefa.status]);

    return (
        // Card da tarefa
        <article className="cards" ref={setNodeRef} style={style} {...attributes}>
            <section>
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
                {/* Adicionando um botão de arrastar o card */}
                <div className="botaoArrastar" {...listeners}>
                    <button type="button" className="botao">⠿</button>
                </div>
            </section>
        </article>
    );
}