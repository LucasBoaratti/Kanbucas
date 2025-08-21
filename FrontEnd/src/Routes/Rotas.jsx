import { Routes, Route } from "react-router-dom";
import { CadastroUsuario } from "../Pages/Usuario/CadastroUsuario";

// Rotas do site
export function Rotas() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<CadastroUsuario/>}/>
            </Route>
        </Routes>
    );
}