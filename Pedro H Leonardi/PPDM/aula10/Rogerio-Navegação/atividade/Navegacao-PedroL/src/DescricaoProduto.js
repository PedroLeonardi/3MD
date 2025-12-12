import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { hamburgers } from "./dataJSON.js";

export default function DescricaoProduto({ navigation, route }) {
    const { index } = route.params || { index: 0 };
    
    const item = hamburgers[index];

    if (!item) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Produto não encontrado.</Text>
            </View>
        );
    }

    function chamarHome() {
        navigation.navigate("Home");
    }

    function chamarCardapio() {
        navigation.navigate("Cardápio");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{item.titulo}</Text>

            <View style={styles.imageWrapper}>
                <Image source={item.imagem} style={styles.imagem} />
            </View>

            <Text style={styles.descricao}>{item.descricao}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={chamarHome} style={styles.button}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={chamarCardapio} style={styles.button}>
                    <Text style={styles.buttonText}>Cardápio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#FFF8DC', 
        justifyContent: 'center', 
    },
    imageWrapper: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imagem: {
        width: 250,
        height: 250,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#8B4513', 
    },
    descricao: {
        fontSize: 16,
        textAlign: 'center',
        color: '#696969',
        marginHorizontal: 15,
        lineHeight: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 20,
    },
    button: {
        backgroundColor: '#A0522D', 
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#8B4513', 
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    }
});