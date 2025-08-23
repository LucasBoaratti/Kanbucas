export function CadastroTarefas() { 
    return (
        <main>
            <section>
                {/* Formulário para cadastrar tarefas */}
                <h1>Cadastro de tarefas</h1>    
                <form>
                    <label htmlFor="descricao">Descrição</label> <br />
                    <textarea name="descricao" id="descricao" placeholder="Descreva a tarefa aqui"></textarea> <br />

                    <label htmlFor="setor">Setor</label> <br />
                    <input type="text" name="setor" id="setor" placeholder="Nome do setor" minLength={1} maxLength={50}/> <br />

                    <label htmlFor="prioridade">Prioridade</label> <br />
                    <select name="prioridade" id="prioridade">
                        <option value="Baixa">Baixa</option>
                        <option value="Média">Média</option>
                        <option value="Alta">Alta</option>
                    </select> <br />

                    <label htmlFor="usuario">Usuário responsável</label> <br />
                    <select name="usuario" id="usuario">
                        <option value="usuario">{id_usuario}</option>
                    </select> <br />

                    <label htmlFor="dataCadastro">Data de cadastro</label> <br />
                    <input type="date" name="dataCadastro" id="dataCadastro" placeholder="Data de cadastro"/> <br />

                    <label htmlFor="status">Status</label> <br />
                    <select name="status" id="status">
                        <option value="A_fazer">A fazer</option>
                        <option value="Fazendo">Fazendo</option>
                        <option value="Pronto">Pronto</option>
                    </select>

                    <div className="containerBotao">
                        <button type="button" className="botao">Cadastrar</button>
                    </div>
                </form>
            </section>
        </main>
    );
}