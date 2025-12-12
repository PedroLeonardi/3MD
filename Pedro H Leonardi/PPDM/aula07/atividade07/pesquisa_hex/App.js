import {styles} from './styles.js'
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";

export default function App() {
  const [hex, setHex] = useState("");
  const [resultado, setresultado] = useState("");

  const ehHexValido = (str) => {
    const len = str.length;
    if (len !== 3 && len !== 6) return false;
  
    return !isNaN(parseInt(str, 16)); // se conseguir converter, é válido
  };

  const buscarCor = async () => {
    let corLimpa = hex.replace("#", "").trim();

    if (!ehHexValido(corLimpa)) {
      setresultado("Por Favor insira um valor valido (3 ou 6 caracteres)");
      return;
    }
    

    try {
      let response = await fetch(`https://www.thecolorapi.com/id?hex=${corLimpa}`);
      const data = await response.json();
      setresultado(data.name.value);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar a cor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Nome da Cor</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a cor (ex: #ff0000 ou ff0)"
        value={hex}
        onChangeText={setHex}
      />

      <TouchableOpacity style={styles.button} onPress={buscarCor}>
        <Text style={styles.buttonText}>Buscar Cor</Text>
      </TouchableOpacity>

      {resultado !== "" && (
        <Text style={styles.resultado}>{resultado}</Text>
      )}
    </View>
  );
}

