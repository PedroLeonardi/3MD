import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { hamburgers } from "./dataJSON.js";



export default function Produto({ navigation }) {
 function chamarProduto(index) {
  navigation.navigate("Descricao Produto", { index: index });
 }
  
  function chamarHome() {
    navigation.navigate("Home");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {hamburgers.map((item, index) => (
          <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => chamarProduto(index)}>
            <Image source={item.imagem} style={styles.itemImage} />
            <Text style={styles.itemTitle}>{item.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={chamarHome} style={styles.homeButton}>
        <Text style={styles.homeButtonText}>Voltar Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
 container: {
  flex: 1, 
  padding: 10,
 },
 row: {
  flexDirection: 'row', 
  flexWrap: 'wrap', 
  justifyContent: 'space-between', 
 },
 itemContainer: {
  width: '48%', 
  marginBottom: 20,
  backgroundColor: '#F5F5DC', 
  borderRadius: 10, 
  padding: 10,
  alignItems: 'center', 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,

 },
 itemTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: 8,
 },
 itemImage: {
  width: 120,
  height: 120,
  borderRadius: 60, 
 },
 homeButton: {
  backgroundColor: '#A0522D',
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 8,
  alignSelf: 'center', 
  marginTop: 20,
  marginBottom: 40,
 },
 homeButtonText: {
  color: '#FFF',
  fontWeight: 'bold',
 },
});