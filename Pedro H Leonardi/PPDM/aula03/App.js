import { View , TouchableOpacity} from 'react-native';

import { styles } from './styles.js';

const corBotao = (cor) =>{
  const corBotao = (cor)
  const [ ,hex] = corBotao.split('#') 
  alert(`Cor de fundo ${hex}`)
}



export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.ladoAlado}>
        <View style={styles.areaInterna}>
          <TouchableOpacity style={styles.botao1} onPress={()=>corBotao(styles.botao1.backgroundColor)}></TouchableOpacity>
        </View>
        <View style={styles.areaInterna}> 
          <TouchableOpacity style={styles.botao2} onPress={()=>corBotao(styles.botao1.backgroundColor)}></TouchableOpacity>
        </View>
      </View>
      <View style={styles.ladoAlado}>
      <View style={styles.areaInterna}> 
          <TouchableOpacity style={styles.botao2}></TouchableOpacity>
        </View>
        <View style={styles.areaInterna}> 
          <TouchableOpacity style={styles.botao1}></TouchableOpacity>
        </View>
      </View>
      <View style={styles.ladoAlado}>
      <View style={styles.areaInterna}> 
          <TouchableOpacity style={styles.botao1}></TouchableOpacity>
        </View>
        <View style={styles.areaInterna}> 
          <TouchableOpacity style={styles.botao2}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



