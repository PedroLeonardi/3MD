import { SQLiteProvider } from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native"; 

import HomeScreen from "./HomeScreen";
import ManageScreen from "./ManageScreen";
import UpdateScreen from "./UpdateScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SQLiteProvider
      databaseName="bookDatabase.db"
      onInit={async (db) => {
        await db.execAsync(`
          -- DROP TABLE IF EXISTS books; 
          CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            publisher TEXT NOT NULL,
            price REAL NOT NULL
          );
          PRAGMA journal_mode=WAL;
          `);
      }}
      options={{ useNewConnection: false }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({ 
              title: "Minha Biblioteca",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("Manage")}
                  title="Gerenciar"
                  color="#004d40"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Manage"
            component={ManageScreen}
            options={{ title: "Gerenciar Livros" }}
          />
          <Stack.Screen
            name="Update"
            component={UpdateScreen}
            options={{ title: "Atualizar Livro" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}