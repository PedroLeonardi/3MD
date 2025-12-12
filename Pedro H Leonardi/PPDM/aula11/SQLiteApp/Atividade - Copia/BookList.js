import { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

const BookList = () => { 
    const [books, setBooks] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const db = useSQLiteContext();

    const loadBooks = async () => {
        try {
            setIsLoading(true);
            const results = await db.getAllAsync(` SELECT * FROM books
                ORDER BY title ASC`); 
            setBooks(results); 
        } catch (error) {
            console.error("Database error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBooks(); 
    }, [db]); 

    if (isLoading && books.length === 0) {
        return <ActivityIndicator size="large" color="#004d40" style={{ marginTop: 20 }}/>;
    }

    return (
        <FlatList
            data={books} 
            style={styles.listContainer}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={loadBooks} tintColor="#00796b" /> 
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemAuthor}>por {item.author}</Text>
                    <View style={styles.detailsContainer}>
                        {item.genre ? (
                            <Text style={styles.itemDetail}>Gênero: {item.genre}</Text>
                        ) : null}
                        {item.pages > 0 ? (
                            <Text style={styles.itemDetail}>{item.pages} páginas</Text>
                        ) : null}
                    </View>
                </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum livro cadastrado</Text>} 
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    itemContainer: {
        backgroundColor: '#dce6dcff', 
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212121',
    },
    itemAuthor: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#555',
        marginBottom: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    itemDetail: {
        fontSize: 14,
        color: '#757575',
        backgroundColor: '#eeeeee', 
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        overflow: 'hidden', 
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 18,
        color: '#888',
    }
});

export default BookList; 