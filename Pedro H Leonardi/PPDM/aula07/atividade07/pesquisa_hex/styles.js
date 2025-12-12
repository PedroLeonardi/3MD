import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 22,
      marginBottom: 20,
      fontWeight: "bold",
    },
    input: {
      borderWidth: 1,
      borderColor: "#888",
      borderRadius: 8,
      padding: 10,
      width: "80%",
      marginBottom: 15,
      fontSize: 16,
      textAlign: "center",
    },
    button: {
      backgroundColor: "#4a90e2",
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
    },
    resultado: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: "600",
    },
})