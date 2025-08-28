import { useNavigate } from "react-router-dom";

export function LoginModal({ openModal }) {
    // Verificação do modal. Serve para ele não ficar aberto ao renderizar uma tela
    if(!openModal) {
        return null;
    }

    // Navegação para a página de tarefas
    const navigate = useNavigate();

    return (
        // Modal de login 
        <section className="containerModalUsuario">
            <div className="modalUsuario">
                <h1 className="tituloModal">Cadastro concluído com sucesso!</h1>
                <div className="containerBotao">
                    <button type="button" className="botao" onClick={() => navigate("/tarefas")}>Avançar</button>
                </div>
            </div>
        </section>
    );
}