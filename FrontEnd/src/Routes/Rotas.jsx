import { Routes, Route } from "react-router-dom";
import { Index } from "../Pages/Index";
import { CadastroUsuario } from "../Pages/Usuario/CadastroUsuario";
import { CadastroTarefas } from "../Pages/Tarefas/CadastroTarefas";
import { Kanban } from "../Pages/Kanban/Kanban";
import { EditarTarefas } from "../Pages/Tarefas/EditarTarefas";

// Rotas do site
export function Rotas() {
    return (
        <Routes>
            {/* Rota da tela de cadastro */}
            <Route path="/" element={<Index/>}>
                <Route index element={<CadastroUsuario/>}/>
            </Route>

            {/* Rota da tela de cadastro de tarefas */}
            <Route path="/tarefas" element={<Index/>}>
                <Route index element={<CadastroTarefas/>}/>
            </Route>

            {/* Rota da tela do kanban */}
            <Route path="/kanban" element={<Index/>}>
                <Route index element={<Kanban/>}/>
            </Route>

            {/* Rota da tela de editar tarefa */}
            <Route path="/editarTarefa" element={<Index/>}>
                <Route index element={<EditarTarefas/>}/>
            </Route>
        </Routes>
    );
}