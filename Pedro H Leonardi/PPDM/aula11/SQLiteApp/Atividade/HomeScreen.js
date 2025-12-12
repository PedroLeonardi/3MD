import { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
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

  const renderBookItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemAuthor}>por {item.author}</Text>
      <Text style={styles.itemPublisher}>Editora: {item.publisher}</Text>
      <Text style={styles.itemPrice}>
        R$ {item.price.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={books}
      renderItem={renderBookItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.listContainer}
      ListEmptyComponent={
        !isLoading && <Text style={styles.emptyText}>Nenhum livro cadastrado</Text>
      }
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadBooks} />
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    backgroundColor: "#f5f5f5", 
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 2,
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
    textAlign: 'right',
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 18,
    color: "#888",
  },
});

export default HomeScreen;