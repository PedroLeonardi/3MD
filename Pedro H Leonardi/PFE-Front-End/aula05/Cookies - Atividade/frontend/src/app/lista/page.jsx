import Listagem from "@/components/blocks/listagem/listagem"
import CardItem from "@/components/CardItem"
import { apiServer } from "@/lib/api-server"
        import { NavMenu } from "@/components/NavigationMenu";


export default async function Lista () {
    
    let itens =  []
        
    try {
        itens = await apiServer.get("items")
        console.log(itens)
    } catch (error) {

    }

    return (
        <>
        <NavMenu />
    <Listagem itemInitial={itens}/>
        </>
    )
}