import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

const UpdateScreen = ({ route, navigation }) => {
  const { bookId } = route.params;

  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    price: "", 
  });
  const [isLoading, setIsLoading] = useState(true);
  const db = useSQLiteContext();

  useEffect(() => {
    const loadBookData = async () => {
      try {
        const book = await db.getFirstAsync(
          "SELECT * FROM books WHERE id = ?",
          [bookId]
        );

        if (book) {
          setForm({
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            price: book.price.toString(), 
          });
        } else {
          Alert.alert("Erro", "Livro não encontrado.");
          navigation.goBack();
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar os dados.");
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    };

    loadBookData();
  }, [db, bookId]);

  const handleUpdate = async () => {
    if (!form.title || !form.author || !form.publisher || !form.price) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    const priceValue = parseFloat(form.price.replace(",", ".")) || 0;
    if (priceValue <= 0) {
      Alert.alert("Erro", "O preço deve ser um valor válido.");
      return;
    }

    try {
      await db.runAsync(
        "UPDATE books SET title = ?, author = ?, publisher = ?, price = ? WHERE id = ?",
        [form.title, form.author, form.publisher, priceValue, bookId] // ADICIONADO
      );
      Alert.alert("Sucesso", "Livro atualizado!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao atualizar livro.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f57c00" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.TituloBox}>Atualizar Dados</Text>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
        />

        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={form.author}
          onChangeText={(text) => setForm({ ...form, author: text })}
        />

        <Text style={styles.label}>Editora</Text>
        <TextInput
          style={styles.input}
          value={form.publisher}
          onChangeText={(text) => setForm({ ...form, publisher: text })}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          value={form.price}
          onChangeText={(text) => setForm({ ...form, price: text })}
          keyboardType="numeric"
        />

        <Button
          title="Salvar Alterações"
          onPress={handleUpdate}
          color="#f57c00"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff8e1",
    margin: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffe0b2",
  },
  TituloBox: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#f57c00",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default UpdateScreen;