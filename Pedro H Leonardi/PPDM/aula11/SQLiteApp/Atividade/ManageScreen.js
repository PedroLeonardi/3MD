import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useIsFocused } from "@react-navigation/native"; 

const ManageScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    price: "",
  });

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const db = useSQLiteContext();
  const isFocused = useIsFocused(); 

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      const results = await db.getAllAsync("SELECT * FROM books ORDER BY title ASC");
      setBooks(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadBooks();
    }
  }, [isFocused, db]);

  const handleAddBook = async () => {
    try {
      if (!form.title || !form.author || !form.publisher || !form.price) {
        throw new Error("Todos os campos são obrigatórios!");
      }
      const priceValue = parseFloat(form.price.replace(",", ".")) || 0;
      if (priceValue <= 0) {
        throw new Error("O preço deve ser um valor válido.");
      }

      await db.runAsync(
        "INSERT INTO books (title, author, publisher, price) VALUES (?, ?, ?, ?)",
        [form.title, form.author, form.publisher, priceValue]
      );

      Alert.alert("Sucesso", "Livro cadastrado!");
      setForm({ title: "", author: "", publisher: "", price: "" }); 
      loadBooks();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.message || "Erro ao adicionar livro");
    }
  };

  const handleDeleteBook = (id, title) => {
    Alert.alert(
      "Confirmar Remoção",
      `Tem certeza que deseja remover o livro "${title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await db.runAsync("DELETE FROM books WHERE id = ?", [id]);
              Alert.alert("Sucesso", "Livro removido!");
              loadBooks(); 
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Erro ao remover livro.");
            }
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.formContainer}>
      <Text style={styles.TituloBox}>Cadastrar Novo Livro</Text>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: O Senhor dos Anéis"
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />
      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: J.R.R. Tolkien"
        value={form.author}
        onChangeText={(text) => setForm({ ...form, author: text })}
      />
      <Text style={styles.label}>Editora</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: HarperCollins"
        value={form.publisher}
        onChangeText={(text) => setForm({ ...form, publisher: text })}
      />
      <Text style={styles.label}>Preço (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 49.90"
        value={form.price}
        onChangeText={(text) => setForm({ ...form, price: text })}
        keyboardType="numeric"
      />
      <Button
        title="Cadastrar Livro"
        onPress={handleAddBook}
        color="#004d40"
      />
    </View>
  );

  const renderBookItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemAuthor}>por {item.author}</Text>
        <Text style={styles.itemPublisher}>Editora: {item.publisher}</Text>
        <Text style={styles.itemPrice}>
          R$ {item.price.toFixed(2).replace(".", ",")}
        </Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.updateButton]}
          onPress={() => navigation.navigate("Update", { bookId: item.id })}
        >
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteBook(item.id, item.title)}
        >
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={books}
      renderItem={renderBookItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={
        !isLoading && <Text style={styles.emptyText}>Nenhum livro cadastrado</Text>
      }
      refreshing={isLoading}
      onRefresh={loadBooks}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  TituloBox: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#004d40",
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
  itemContainer: {
    backgroundColor: "#dce6dcff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212121",
  },
  itemAuthor: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 5,
  },
  itemPublisher: {
    fontSize: 14,
    color: "#444",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#004d40",
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  updateButton: {
    backgroundColor: "#f57c00",
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 18,
    color: "#888",
  },
});

export default ManageScreen;