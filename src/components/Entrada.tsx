
interface EntradaProps {
    tipo?: 'text' | 'number'
    texto: String
    valor: any
    somentLeitura?: boolean
    className?: string
    valorMudou?: (valor: any) => void
}

export default function Entrada(props: EntradaProps) {

    return (
        <div className={`flex flex-col ${props.className || ' '}`}>
            <label className="mb-2">{props.texto}</label>
            <input 
            onChange={e => props.valorMudou?.(e.target.value)}
                type={props.tipo ?? "text"} 
                value= {props.valor}
                readOnly={props.somentLeitura}
                className={`
                    border border-purple-500 rounded-lg focus:outline-none  
                    bg-gray-100 px-4 py-2 focus:bg-white ${props.somentLeitura ? ' ' : 'focus:bg-white'}
                `}
            />

        </div>
    )
}