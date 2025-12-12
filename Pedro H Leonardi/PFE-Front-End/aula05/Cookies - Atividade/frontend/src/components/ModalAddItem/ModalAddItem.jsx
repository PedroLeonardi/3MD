"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ModalAddItem({ onAddItem }) {

    const [open, setOpen] = useState(false)

    const [titulo, setTitulo] = useState("")
    const [status, setStatus] = useState("")
    const [descricao, setDescricao] = useState("")
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form >
                <DialogTrigger asChild>
                    <Button>Adicionar Item</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionado Item</DialogTitle>
                        <DialogDescription>
                            Utilize este modal para adionar itens a lista
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="titulo">Titulo</Label>
                            <Input id="titulo" name="titulo"
                                value={titulo}
                                onChange={(e) => { setTitulo(e.target.value) }}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={(e) => { setStatus(e.target.value) }}
                            >
                                <option value="" disabled>Selecione um status</option>
                                <option value="pendente">Pendente</option>
                                <option value="concluido">Concluído</option>
                                <option value="desativado">Desativado</option>
                            </select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="descricao">Descricao</Label>
                            <Input id="descricao" name="descricao"
                                value={descricao}
                                onChange={(e) => { setDescricao(e.target.value) }} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit"
                            onClick={(e) => {
                                e.preventDefault() //PARA A PAGINA NÃO RECAREGAR A PAGINA
                                onAddItem({ titulo, status, descricao })
                            setOpen(false)
                            }}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
