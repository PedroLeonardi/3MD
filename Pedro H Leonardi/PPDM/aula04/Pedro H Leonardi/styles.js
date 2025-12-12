import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linha: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowDirection: {
        flexDirection: 'row'
    },
    buttonSpace:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },
    button1: {
        width: 190,
        height: 100,
        backgroundColor: '#3AF2B7',
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: 0,
        borderStyle: 'solid',
    },
    button2: {
        width: 150,
        height: 150,
        backgroundColor: '#E64F9C',
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: '100%',
        borderStyle: 'solid',
    },
    button3: {
        width: 100,
        height: 250,
        backgroundColor: '#9A2BFF',
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: 20,
        borderStyle: 'solid',
    },
    button4: {
        width: 190,
        height: 190,
        backgroundColor: '#F2C94C',
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: 20,
        borderStyle: 'solid',
    },
    quadroFinal: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 270,
        height: 200,
        backgroundColor: '#cccccc',
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: 20,
        borderStyle: 'solid',
    },
    
    texto: {
        flex: 4,
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 28 
    },
    limparSelecao: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: 150,
            maxHeight: 40,
            marginBottom: 5,
            backgroundColor: '#F2C94C',
            borderWidth: 3,
            borderColor: '#000000',
            borderRadius: 20,
            borderStyle: 'solid',
    }
}

)