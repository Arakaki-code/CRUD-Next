import { useState } from "react";
import Entrada from "./Entrada";
import Cliente from "../core/Cliente";
import Botao from "./Botao";

interface FormularioProps {
  cliente: Cliente;
  cancelado?: () => void;
  clienteAlterado?: (cliente: Cliente) => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.cliente?.id ?? null;
  const [nome, setNome] = useState(props.cliente?.nome ?? "");
  const [idade, setIdade] = useState(props.cliente?.idade ?? 0);

  return (
    <div>
      {id ? (
        <Entrada somentLeitura texto="Código" valor={id} className="mb-4" />
      ) : (
        false
      )}
      <Entrada
        texto="Nome"
        valor={nome}
        valorMudou={setNome}
        className="mb-4"
      />
      <Entrada
        texto="Idade"
        tipo="number"
        valor={idade}
        valorMudou={setIdade}
      />
      <div className="mt-7 flex justify-end">
        <Botao cor={"blue"} className="mr-2" onClick={ () => props.clienteAlterado?.(new Cliente(nome, +idade, id))}>
            {id ? "Alterar" : "Salvar"}
        </Botao>
        <Botao cor={"gray"} onClick={props.cancelado}>
            Cancelar
        </Botao>
      </div>
    </div>
  );
}
