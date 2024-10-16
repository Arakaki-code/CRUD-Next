


export default function Titulo(props: any) {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="px-5 py-2 text-2xl font-bold text-purple-500">{props.children}</h1>
            <hr className="border-2 border-purple-400"/>
        </div>
    )
}