import {styles} from "./styles.js"
import { useState } from "react";

import { TouchableOpacity } from "react-native"
import { Text, View } from 'react-native';

export default function App() {
  const [hexCor, sethexCor] = useState('')
  const [nomeCor, setnomeCor] = useState('')
  

async function findCor (cor) {
  
  
  const corLimpa = cor.replace("#", "")
  sethexCor(corLimpa)

  let response = await fetch(`https://www.thecolorapi.com/id?hex=${corLimpa}`);
  const data = await response.json()
  setnomeCor (data.name.value)
}


function limparFoto () {
  setnomeCor ("")
}

  return (
    <View style={styles.container}>
      <View style = {styles.spaceButtons}>
      
          <View style= {styles.row}>
              <TouchableOpacity onPress={() =>findCor(styles.button1.backgroundColor)} style= {[styles.buttonBase, styles.button1]}><Text></Text></TouchableOpacity>
              <TouchableOpacity onPress={() =>findCor(styles.button2.backgroundColor)}style= {[styles.buttonBase, styles.button2]}><Text></Text></TouchableOpacity>
          </View>
          <View style= {styles.row}>
              <TouchableOpacity onPress={() =>findCor(styles.button3.backgroundColor)} style= {[styles.buttonBase, styles.button3]}><Text></Text></TouchableOpacity>
              <TouchableOpacity onPress={() =>findCor(styles.button4.backgroundColor)} style= {[styles.buttonBase, styles.button4]}><Text></Text></TouchableOpacity>
          </View>
          <View style= {styles.row}>
              <TouchableOpacity onPress={() =>findCor(styles.button5.backgroundColor)} style= {[styles.buttonBase, styles.button5]}><Text></Text></TouchableOpacity>
              <TouchableOpacity onPress={() =>findCor(styles.button6.backgroundColor)} style= {[styles.buttonBase, styles.button6]}><Text></Text></TouchableOpacity>
          </View>
          <View style= {styles.row}>
              <TouchableOpacity onPress={() =>findCor(styles.button7.backgroundColor)} style= {[styles.buttonBase, styles.button7]}><Text></Text></TouchableOpacity>
              <TouchableOpacity onPress={() =>findCor(styles.button8.backgroundColor)} style= {[styles.buttonBase, styles.button8]}><Text></Text></TouchableOpacity>
          </View>
          <View style= {styles.row}>
              <TouchableOpacity onPress={() =>findCor(styles.button9.backgroundColor)} style= {[styles.buttonBase, styles.button9]}><Text></Text></TouchableOpacity>
              <TouchableOpacity onPress={() =>findCor(styles.button10.backgroundColor)} style= {[styles.buttonBase, styles.button10]}><Text></Text></TouchableOpacity>
          </View>
          <View style= {styles.row}>
              <TouchableOpacity onPress={() =>findCor(styles.button11.backgroundColor)} style= {[styles.buttonBase, styles.button11]}><Text></Text></TouchableOpacity>
              <TouchableOpacity onPress={() =>findCor(styles.button12.backgroundColor)} style= {[styles.buttonBase, styles.button12]}><Text></Text></TouchableOpacity>
          </View>
          </View>
      
        <View style={styles.caixaTexto} >
          <Text>Cor: {nomeCor}</Text>
          <TouchableOpacity onPress={()=>limparFoto() } style= {styles.buttonLimpar}><Text>Limpar</Text></TouchableOpacity>
        </View>
      
    </View>
  );
}