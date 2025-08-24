import { Routes, Route } from "react-router-dom";
import { Index } from "../Pages/Index";
import { CadastroUsuario } from "../Pages/Usuario/CadastroUsuario";
import { CadastroTarefas } from "../Pages/Tarefas/CadastroTarefas";

// Rotas do site
export function Rotas() {
    return (
        <Routes>
            {/* Rota da tela de cadastro */}
            <Route path="/">
                <Route index element={<CadastroUsuario/>}/>
            </Route>

            {/* Rota da tela de cadastro de tarefas */}
            <Route path="/tarefas" element={<Index/>}>
                <Route index element={<CadastroTarefas/>}/>
            </Route>
        </Routes>
    );
}