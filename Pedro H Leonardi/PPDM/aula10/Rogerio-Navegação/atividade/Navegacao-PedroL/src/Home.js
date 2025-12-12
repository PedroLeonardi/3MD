import {Text, View, TouchableOpacity, Image } from "react-native";

export default function Home ({navigation}) {
    
    function chamarProdutos() {
        navigation.navigate('Cardápio');
      }
    

    return (
        <>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
      <View style={{ borderRadius: 10, overflow: 'hidden' }}>
        <Image
          source={require('../assets/logo.jpg')}
          style={{ width: 220, height: 220 }}
        />
      </View>

      
      <TouchableOpacity
        onPress={chamarProdutos}
        activeOpacity={0.7} 
        style={{
          backgroundColor: '#A0522D', 
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#000', 
        }}>
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
          Ver Cardapio
        </Text>
      </TouchableOpacity>
    </View>
        </>
    )
}