import { useNavigate } from "react-router-dom";

export function Cabecalho() {
    const navigate = useNavigate();

    return (
        // Cabeçalho do site
        <header className="containerCabecalho">
            <h1 className="titulo">Gereciamentos de tarefas</h1>
            <nav>
                <ul className="links">
                    <li onClick={() => navigate("/")} style={{ }}>Cadastro de usuário</li>
                    <li onClick={() => navigate("/tarefas")}>Cadastro de tarefa</li>
                    <li>Gerenciar tarefas</li>
                </ul>
            </nav>
        </header>
    );
}