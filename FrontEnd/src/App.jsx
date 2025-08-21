import { BrowserRouter } from "react-router-dom";
import { Rotas } from "./Routes/Rotas";
import "./Styles/Main.scss";

// Função app que renderiza as páginas do projeto
function App() {
	return (
		<BrowserRouter>
			<Rotas/>
		</BrowserRouter>
	);
}

export default App;
