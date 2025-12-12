"use client" //POR SER UM HOOK E TER INTERAÇÃO COM USUARIO "USE CLIENT"

import { useState, useEffect, useCallback } from "react"
import { api } from "@/lib/api"

export function useItens(itensInitial = []) {
    // UM HOOK SEMPRE DEVE TER DUAS COISAS O LOADIND E O ERROR
    const [loading, setLoading] = useState(false) // funcionalidade exibir que esta em recaregamente
    const [error, setError] = useState(null) // garantir que não tem erro
    const [itens, setItens] = useState(itensInitial) // O DATA PODE VIR DE DUAS FORMAR OU POR PARAMENTRO OU POR UM FETCH INTERNO
    // NO HOOK 

    const addItem = async (newItemData) => {
        console.log(newItemData);

        setLoading(true)
        setError(null)
        try {
            const createdItem = await api.post("items", newItemData)
            if (createdItem.error) {
                setError("Erro ao criar item")
            }
            setItens((prevItens) => [...prevItens, createdItem])

        } catch (error) {
            setError("Erro ao criar Itens")

        }
    }

    const updateItem = async (updateItemData, id) => {
        // console.log(updateItemData);
        // console.log("----------------------" + id);
        setLoading(true);
        setError(null);
        try {
            const updatedItem = await api.put(`items/${id}`, updateItemData);

            if (updatedItem.error) {
                setError(updatedItem.message || "Erro ao atualizar item");
            } else {
                setItens(prevItens =>
                    (prevItens || []).map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                );
            }
        } catch (error) {
            setError("Erro de rede ao atualizar Itens");
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (deletedID, item) => {
        console.log(deletedID);

        setLoading(true);
        setError(null);
        try {
            const deletedItems = await api.del(`items/${deletedID}`, itens);
            console.log(deletedID, itens)

            if (deletedItems.error) {
                setError(deletedItems.message || "Erro ao atualizar item");
            } else {

                setItens((prevItens) => prevItens.filter((item) => item.id !== deletedID))



            }
        } catch (error) {
            setError("Erro de rede ao deletar Itens");
        } finally {
            setLoading(false);
        }
    };

    return { itens, loading, error, addItem, updateItem, deleteItem }
}