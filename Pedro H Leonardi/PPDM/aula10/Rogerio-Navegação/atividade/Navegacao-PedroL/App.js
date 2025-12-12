import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from
  '@react-navigation/stack';

const Stack = createStackNavigator()

import Home from "./src/Home";
import Produtos from "./src/Produtos";
import DescricaoProduto from "./src/DescricaoProduto";



export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Cardápio' component={Produtos} />
          <Stack.Screen name='Descricao Produto' component={DescricaoProduto} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}