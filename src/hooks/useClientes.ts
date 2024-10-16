// hooks/useClientes.ts
import { useEffect, useState } from "react";
import Cliente from "../core/Cliente";
import ColecaoCliente from "../firebase/db/ColecaoCliente";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes() {
    
    const colecaoCliente = new ColecaoCliente();
    
    const {
        tabelaVisivel,
        exibirTabela,
        exibirFormulario
    } = useTabelaOuForm();

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const carregarClientes = async () => {
      const clientesCarregados = await colecaoCliente.obterTodos();
      setClientes(clientesCarregados);
    };
    carregarClientes();
  }, []);

  const selecionarCliente = (cliente: Cliente) => {
    setCliente(cliente);
    exibirFormulario();
  };

  const excluirCliente = async (cliente: Cliente) => {
    await colecaoCliente.excluir(cliente);
    setClientes(prevClientes => prevClientes.filter(c => c.id !== cliente.id));
  };

  const novoCliente = () => {
    setCliente(Cliente.vazio());
    exibirFormulario();
  };

  const salvarCliente = async (cliente: Cliente) => {
    const clienteSalvo = await colecaoCliente.salvar(cliente);
    
    setClientes(prevClientes => {
      const existingClientIndex = prevClientes.findIndex(c => c.id === clienteSalvo.id);
      if (existingClientIndex !== -1) {
        const updatedClients = [...prevClientes];
        updatedClients[existingClientIndex] = clienteSalvo;
        return updatedClients;
      }
      return [...prevClientes, clienteSalvo];
    });
    exibirTabela();
  };

  return {
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
  };
}
