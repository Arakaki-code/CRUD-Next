// pages/index.tsx
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import useClientes from "../hooks/useClientes";

export default function Home() {
  const {
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
  } = useClientes();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <Layout titulo="Cadastro Simples">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end w-full">
              <Botao cor="green" className="mb-4" onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              clienteSelecionado={selecionarCliente}
              clienteExcluido={excluirCliente}
            />
          </>
        ) : (
          <Formulario
            cliente={cliente}
            cancelado={exibirTabela}
            clienteAlterado={salvarCliente}
          />
        )}
      </Layout>
    </div>
  );
}

