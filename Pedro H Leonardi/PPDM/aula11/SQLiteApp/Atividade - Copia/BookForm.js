import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native'; 
import { useSQLiteContext } from 'expo-sqlite';

const BookForm = () => { // Renomeado
    const [form, setForm] = useState({
        title: '',
        author: '',
        pages: '',
        genre: ''
    });

    const db = useSQLiteContext();


    const handleAddBook = async () => {
        try {            
            if (!form.title || !form.author) {
                throw new Error('Título e Autor são obrigatórios');
            }

            const pageCount = parseInt(form.pages) || 0;

            await db.runAsync(
                'INSERT INTO books (title, author, pages, genre) VALUES (?, ?, ?, ?)', 
                [form.title, form.author, pageCount, form.genre] 
            );

            Alert.alert('Livro adicionado'); 
            setForm({
                title: '',
                author: '',
                pages: '',
                genre: ''
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', error.message || 'Erro ao adicionar livro');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.TituloBox}>Cadastro de Livros</Text>
            <Text style={styles.label}>Título do Livro</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: O senhor dos aneis"
                value={form.title}
                onChangeText={(text) => setForm({ ...form, title: text })}
            />
            
            <Text style={styles.label}>Autor</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Tolkien"
                value={form.author}
                onChangeText={(text) => setForm({ ...form, author: text })}
            />

            <Text style={styles.label}>Nº de Páginas (Opcional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 500"
                value={form.pages}
                onChangeText={(text) => setForm({ ...form, pages: text })}
                keyboardType="numeric"
            />
            
            <Text style={styles.label}>Gênero (Opcional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Ficção de Aventura"
                value={form.genre}
                onChangeText={(text) => setForm({ ...form, genre: text })}
            />

            <Button title="Adicionar Livro" onPress={handleAddBook} color="#004d40" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5', 
        margin: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
TituloBox:{
        fontSize: 25,
        textAlign: 'center', 
        marginBottom: 20, 
        fontWeight: 'bold', 
        color: '#004d40', 
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 12,
        borderRadius: 5,
        backgroundColor: '#fff', 
        fontSize: 16,
    },
});

export default BookForm; 