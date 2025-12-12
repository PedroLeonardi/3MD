
'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertConfirmation({ onDeleteItem }) {



  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="w-full">Deletar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao prosseguir os dados serão permanentementes excluidos da sua aplicação
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            // onClick={deleteItem}
              onClick={(e) => {
              e.preventDefault() //PARA A PAGINA NÃO RECAREGAR A PAGINA
              onDeleteItem()
          }
          }
          >Excluir</AlertDialogAction>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
