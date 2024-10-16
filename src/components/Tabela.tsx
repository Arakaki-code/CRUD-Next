import Cliente from "../core/Cliente";
import { IconEdicao, IconExclusao } from "./Icons";

interface TabelaProps {
  clientes: Cliente[];
  clienteSelecionado?: (cliente: Cliente) => void;
  clienteExcluido?: (cliente: Cliente) => void;
}

export default function Tabela(props: TabelaProps) {
  const exibirAcoes = props.clienteExcluido || props.clienteSelecionado;

  function renderizarCabecalho() {
    return (
      <tr>
        <th className="text-left p-3">Código</th>
        <th className="text-left p-3">Nome</th>
        <th className="text-left p-3">Idade</th>
        {exibirAcoes ? <th className="p-3">Ações</th> : false}
      </tr>
    );
  }

  function renderizarDados() {
    return props.clientes?.map((cliente: any, i: any) => {
      return (
        <tr
          key={cliente.id}
          className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
        >
          <td className="text-left p-3">{cliente.id}</td>
          <td className="text-left p-3">{cliente.nome}</td>
          <td className="text-left p-3">{cliente.idade}</td>
          {exibirAcoes ? renderizarAcoes(cliente) : false}
        </tr>
      );
    });
  }

  function renderizarAcoes(cliente: Cliente) {
    return (
      <td className="flex justify-center">
        {props.clienteSelecionado ? (
          <button
          onClick={() => props.clienteSelecionado?.(cliente)}
            className={`
                flex justify-center items-center text-green-600 
                rounded-full hover:bg-purple-50 p-2 m-1
            `}
          >
            {IconEdicao}
          </button>
        ) : (
          false
        )}
        {props.clienteExcluido ? (
          <button
          onClick={() => props.clienteExcluido?.(cliente)}
            className={`
                flex justify-center items-center text-red-500 
                rounded-full hover:bg-purple-50 p-2 m-1
            `}
          >
            {IconExclusao}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table className="table w-full rounded-xl overflow-hidden">
      <thead
        className={`
            bg-gradient-to-r from-purple-500 to-purple-800 text-white
        `}
      >
        {renderizarCabecalho()}
      </thead>
      <tbody>{renderizarDados()}</tbody>
    </table>
  );
}
