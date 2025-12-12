import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { styles } from "./styles.js";


export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);

  function calcularIMC() {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!pesoNum || !alturaNum) {
      alert("Preencha peso e altura corretamente!");
      return;
    }

    const resultado = pesoNum / (alturaNum * alturaNum);
    setImc(resultado.toFixed(2));
  }

  function Limpar() {
    setAltura("");
    setPeso("");
    setImc(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo do IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu peso (kg)"
        keyboardType="numeric"
        placeholderTextColor="#999"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua altura (m) ex: 1.75"
        keyboardType="numeric"
        placeholderTextColor="#999"
        value={altura}
        onChangeText={setAltura}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={calcularIMC} style={styles.button}>

          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Limpar} style={styles.button}>
 
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {imc !== null && <Text style={styles.result}>Seu IMC é: {imc}</Text>}
      {
        
      }
      <StatusBar style="auto" />
    </View>
  );
}
