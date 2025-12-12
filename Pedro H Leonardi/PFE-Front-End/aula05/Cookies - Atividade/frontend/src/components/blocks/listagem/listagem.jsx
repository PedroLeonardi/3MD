"use client"

import { useItens } from "@/hooks/useItens"
import CardItem from "@/components/CardItem"
import ModalAddItem from "@/components/ModalAddItem/ModalAddItem"

export default function Listagem({ itemInitial }) {

    const { itens, loading, error, addItem, updateItem, deleteItem } = useItens(itemInitial)

    return (
        <>
        <ModalAddItem onAddItem={(newItem)=>{addItem(newItem)}}/> {/* ESTUDAR ESTA PARTE */}
<div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            
            {itens &&
                itens.map((item) => {
                    return  <CardItem key={item.id} item={item} functionUpdate={updateItem} functionDelete={deleteItem}/>
                })
            }
</div>
        </>
    )

}