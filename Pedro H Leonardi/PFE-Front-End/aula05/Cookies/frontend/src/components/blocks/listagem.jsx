"use client"

import { useItens } from "@/hooks/useItens"
import CardItem from "../CardItem"
import ModalAddItem from "../ModalAddItem"

export default function Listagem({ itemInitial }) {

    const { itens, loading, error, addItem } = useItens(itemInitial)

    return (
        <>
        <ModalAddItem onAddItem={(newItem)=>{addItem(newItem)}}/> {/* ESTUDAR ESTA PARTE */}
            {itens &&
                itens.map((item) => {
                    return <CardItem key={item.id} item={item} />
                })
            }
        </>
    )

}