import { Cabecalho } from "../Components/Cabecalho/Cabecalho";
import { Outlet } from "react-router-dom";

// Função index que ajeita o layout das páginas com o cabeçalho e o conteúdo criado nelas
export function Index() {
    return (
        <>
            <Cabecalho/>
            <Outlet/>
        </>
    );
}