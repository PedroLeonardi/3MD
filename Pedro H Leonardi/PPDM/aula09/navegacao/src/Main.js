import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function Main({navigation}) {

function chamarTela2 () {
 navigation.navigate("Tela2")
}

function chamarTela3 () {
 navigation.navigate("Tela3")
  
}

  return (
    <View >
      <Text>MAIN</Text>
      <TouchableOpacity onPress={chamarTela2}>
        <Text >Chamar Tela 2</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={chamarTela3}>
        <Text >Chamar Tela 3</Text>
      </TouchableOpacity>


    </View>
  );
}
