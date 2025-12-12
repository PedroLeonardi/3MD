"use client" //POR SER UM HOOK E TER INTERAÇÃO COM USUARIO "USE CLIENT"

import { useState, useEffect, useCallback } from "react"
import {api} from "@/lib/api"

export function useItens(itensInitial = []){
    // UM HOOK SEMPRE DEVE TER DUAS COISAS O LOADIND E O ERROR
    const [loading, setLoading] = useState(false) // funcionalidade exibir que esta em recaregamente
    const [error, setError] = useState (null) // garantir que não tem erro
    const [itens, setItens] = useState(itensInitial) // O DATA PODE VIR DE DUAS FORMAR OU POR PARAMENTRO OU POR UM FETCH INTERNO
                                                     // NO HOOK 
                                                    
    const addItem = async (newItemData) => {
        console.log(newItemData);
        
        setLoading(true)
        setError(null)
        try {
            const createdItem = await api.post("items", newItemData)
            if(createdItem.error) {
                setError("Erro ao criar item")
            }
            setItens ((prevItens) => [...prevItens, createdItem])

        } catch (error) {
            setError("Erro ao criar Itens")
            
        }
    }
    return { itens, loading, error, addItem }
}