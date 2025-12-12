export default function CardItem ({item}) {
    return ( 
        <>
            <li className="p-2 border-2 border-border rounded-2xl">
                <h2>{item.titulo}</h2>
                <p>{item.status}</p>
            </li>
        </>
    )
}