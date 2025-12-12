
// import { useItens } from "@/hooks/useItens"





// item={item} function={updateItem}



import { Button } from "@/components/ui/button";
import ModalUpdateitem from "../ModalUpdateItem/ModalUpdateItems"
import { AlertConfirmation } from "../ModalDeleteItem/modalDeleteItem"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelpIcon } from "lucide-react";

export default function CardItem({ item, functionUpdate, functionDelete }) {


    // return ( 
    // <>
    //     {/* <li className="p-2 border-2 border-border rounded-2xl"> */}
    //         {/* <h2>{item.titulo}</h2>
    //         <p>{item.status}</p> */}
    //         <ModalUpdateitem onUpdateItem={(updatedItem)=> {functionUpdate(updatedItem , item.id)}}/>
    //         <AlertConfirmation onDeleteItem={() => {functionDelete( item.id, item.titulo)}}/>

    //     </li>
    // </>
    // )

    return (
        <Card className="max-w-xs w-full shadow-md shadow-border/70">
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight"> {/* TITULO */}
                    {item.titulo}
                </CardTitle>
                <CardDescription> {/* STATUS */}
                    {item.status}
                </CardDescription>
                <CardDescription>{/* descricao */}
                    {item.descricao}
                </CardDescription>
            </CardHeader>
            {/* <CardContent className="text-sm text-muted-foreground flex items-end leading-6">
                <span className="text-4xl leading-none font-bold text-foreground">
                    $20
                </span>
                <span className="ml-0.5 mr-1.5">/mo</span>
                <Tooltip>
                    <TooltipTrigger className="mb-1">
                        <CircleHelpIcon className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                        <p>
                            Valor unitario para a compra de um exemplar (valor meramente ilustrativo)
                        </p>
                    </TooltipContent>
                </Tooltip>
            </CardContent> */}
            <CardFooter className="mt-2 flex-col gap-1 justify-between">
                <ModalUpdateitem   onUpdateItem={(updatedItem) => { functionUpdate(updatedItem, item.id) }} />
                <AlertConfirmation onDeleteItem={() => { functionDelete(item.id, item.titulo) }} />
                {/* <Button size="lg" className="w-full">
                    Try for free
                </Button> */}
            </CardFooter>
        </Card>
    );
}
