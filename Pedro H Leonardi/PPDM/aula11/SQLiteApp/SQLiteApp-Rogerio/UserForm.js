import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

const UserForm = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const db = useSQLiteContext();

    const handleSubmit = async () => {
        try {            
            if (!form.firstName || !form.lastName || !form.email || !form.phone) {
                throw new Error('Preencha todos os campos');
            }

            await db.runAsync(
                'INSERT INTO users (firstName, lastName, email, phone) VALUES (?, ?, ?, ?)',
                [form.firstName, form.lastName, form.email, form.phone]
            );

            Alert.alert('Usuário adicionado');
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.message || 'Erro ao adicionar usuário');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={form.firstName}
                onChangeText={(text) => setForm({ ...form, firstName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={form.lastName}
                onChangeText={(text) => setForm({ ...form, lastName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
            />

            <Button title="Add User" onPress={handleSubmit} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: '40%',
        backgroundColor: "#ffa500",
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        borderRadius: 10,
        padding: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#253025",
    },
}
);

export default UserForm;
