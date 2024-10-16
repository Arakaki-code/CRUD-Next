interface BotaoProps {
  children: any;
  className?: string;
  cor: "green" | "blue" | "red" | "gray";
  onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
  const colors: any = {
    blue: "from-blue-500 to-blue-700",
    red: "from-red-500 to-red-700",
    green: "from-green-500 to-green-700",
    gray: "from-gray-500 to-gray-700",
  };

  return (
    <button
      className={`
            bg-gradient-to-r ${colors[props.cor]}
            text-white px-4 py-2 rounded-md
            ${props.className}
        `}
        onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
