import { useNavigate } from "react-router-dom";

export function Cabecalho() {
    const navigate = useNavigate();

    return (
        // Cabeçalho do site
        <header className="containerCabecalho">
            <h1 className="titulo">Gereciamentos de tarefas</h1>
            <nav>
                <ul className="links">
                    <li onClick={() => navigate("/")} className="link" aria-current="Cadastro de usuário" tabIndex={0} onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            navigate("/");
                        }
                    }}>Cadastro de usuário</li>
                    <li onClick={() => navigate("/tarefas")} className="link" aria-current="Cadastro de tarefas" tabIndex={0} onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            navigate("/tarefas");
                        }
                    }}>Cadastro de tarefas</li>
                    <li onClick={() => navigate("/kanban")} className="link" aria-current="Gerenciar tarefas" tabIndex={0} onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            navigate("/kanban");
                        }
                    }}>Gerenciar tarefas</li>
                </ul>
            </nav>
        </header>
    );
}