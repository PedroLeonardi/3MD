import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function Tela3() {

    function chamarMain () {
        navigation.navigate("Main")
       }
       
       function chamarTela2 () {
        navigation.navigate("Tela3")
         
       }

  return (
    <View >
      <Text>TELA 3</Text>
      <TouchableOpacity onPress={chamarMain}>
        <Text >Chamar Main</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={chamarTela2}>
        <Text >Chamar Tela 2</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
