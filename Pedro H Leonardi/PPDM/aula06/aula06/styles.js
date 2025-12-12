import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:15
      },
      spaceButtons: {
        flex: 2,
        width: '100%', // Adicionei para garantir que o contêiner dos botões ocupe a largura total
      }, 
    row: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      marginVertical: 5,          // espaço entre as linhas
      // backgroundColor: "#f06", // Removi esta cor de fundo da linha para melhor visualização
      justifyContent: 'space-between', // Distribui os botões igualmente com espaço entre eles
      gap: 10, // Define um espaço de 10px entre os itens na linha
  

    },
    buttonBase : {
      flex: 1, // Isso fará com que cada botão ocupe metade do espaço disponível na linha (menos o gap)
      borderColor: "#000",
      borderWidth: 3,    
      borderStyle: "solid",
      borderRadius: 15,
      height: 80, // Altura fixa para o botão para visualização
      justifyContent: 'center', // Centraliza o conteúdo (se houver)
      alignItems: 'center', // Centraliza o conteúdo (se houver)
    },

    button1: { backgroundColor: '#8E44AD'},
    button2: { backgroundColor: '#16A085'},
    button3: { backgroundColor: '#E67E22'},
    button4: { backgroundColor: '#3498DB'},
    button5: { backgroundColor: '#2ECC71'},
    button6: { backgroundColor: '#E74C3C'},
    button7: { backgroundColor: '#1ABC9C'},
    button8: { backgroundColor: '#9B59B6'},
    button9: { backgroundColor: '#F1C40F'},
    button10: { backgroundColor: '#3357FF'},
    button11: { backgroundColor: '#33FF57'},
    button12: { backgroundColor: '#FF5733'},


    caixaTexto: {
      flex:1,
      width:"80%",
      backgroundColor: '#0f0',
      borderColor: "#000",
      borderWidth: 5,             // largura da borda
      borderStyle: "solid",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center"
    },
    buttonLimpar: {
      backgroundColor: "#f06",
      borderColor: "#000",
      width: '50%',
      borderWidth: 1,             // largura da borda
      borderStyle: "solid",
      borderRadius: 15,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }
})