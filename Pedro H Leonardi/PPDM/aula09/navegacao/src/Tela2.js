import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Tela2({navigation}) {
  
    function chamarMain () {
        navigation.navigate("Main")
       }
       
       function chamarTela3 () {
        navigation.navigate("Tela3")
         
       }


    return (
    <View >
      <Text>TELA2</Text>
      <TouchableOpacity onPress={chamarMain}>
        <Text >Chamar Main</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={chamarTela3}>
        <Text >Chamar Tela 3</Text>
      </TouchableOpacity>


    </View>
  );
}


