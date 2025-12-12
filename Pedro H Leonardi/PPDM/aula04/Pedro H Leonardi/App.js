import { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles.js'




export default function App() {
  const [data, setData] = useState('')

// OUTRA FUNÇÃO 
const propriedades = (cor) => {
  for (let key in cor) { // pega para todo o Objeto Java scpirt
    console.log (key) // exibe a Key do css
    console.log (`${key}: ${cor.key}`) // chama a KEY, em key, e o VALOR em cor.key
    switch (key) {
      case 'backgroundColor':
        console.log (`${key}: ${cor.key.slice(1,7,8)}`)
      break
      case 'height':
        console.log (`${key}: ${cor.key}`)
      break
      case 'widht':
        console.log (`${key}: ${cor.key}`)
      break
    }
  }
}


  function selecionarBotao  (data) {
  
     let [ , hex] = data.backgroundColor.split("#")

    const informacoesBotao = (`
      backgroudColor: ${hex} 
      widht: ${data.width} 
      hieght: ${data.height} 
      borderRadius: ${data.borderRadius}
      `)
  
      setData(informacoesBotao)
  }

  
  
  function limparData () {
    setData()
  }

  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <View style={styles.rowDirection}>
          <View style={styles.buttonSpace}>
            <TouchableOpacity style={styles.button1} onPress={() => selecionarBotao(styles.button1)}>
              
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSpace}>
            <TouchableOpacity style={styles.button2}  onPress={() => selecionarBotao(styles.button2)}>

            </TouchableOpacity>
          </View>
        </View>
      </View>{/* Linha 1 */}
      <View style={styles.linha}>
      <View style={styles.rowDirection}>
          <View style={styles.buttonSpace}>
            <TouchableOpacity style={styles.button3}  onPress={() => selecionarBotao(styles.button3)} >
              
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSpace}>
            <TouchableOpacity style={styles.button4}  onPress={() => selecionarBotao(styles.button4)}>

            </TouchableOpacity>
          </View>
        </View>
      </View>{/* Linha 2 */}
      <View style={styles.linha}>
        <View style={styles.quadroFinal}>
          <Text style={styles.texto}>{data}</Text>
          <TouchableOpacity style={styles.limparSelecao} onPress={() => limparData()} >
            <Text>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>{/* Linha 3 */}
    </View>
  );
}



