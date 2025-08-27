import { useNavigate } from "react-router-dom";

export function Cabecalho() {
    const navigate = useNavigate();

    return (
        // Cabeçalho do site
        <header className="containerCabecalho">
            <h1 className="titulo">Gereciamentos de tarefas</h1>
            <nav>
                <ul className="links">
                    <li onClick={() => navigate("/")} className="link">Cadastro de usuário</li>
                    <li onClick={() => navigate("/tarefas")} className="link">Cadastro de tarefa</li>
                    <li onClick={() => navigate("/kanban")} className="link">Gerenciar tarefas</li>
                </ul>
            </nav>
        </header>
    );
}