import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./src/Main";
import Tela2 from "./src/Tela2";
import Tela3 from "./src/Tela3";


const Stack = createStackNavigator();

export default function app () {
  return (
    <>
    <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Main" component={Main}/>
    <Stack.Screen name="Tela2" component={Tela2}/>
    <Stack.Screen name="Tela3" component={Tela3}/>
  </Stack.Navigator>
</NavigationContainer>
    </>
  )
}

