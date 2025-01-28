import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUsers } from '../components/Api';
import { useAuth } from './AuthContext'
import { Icon } from 'react-native-elements';

const Auth = () => {
    const navigation = useNavigation();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setError('');
        setSuccessMessage('');

        try {
            const users = await fetchUsers();
            const user = users.find(
                (u) =>
                    u.username === formData.username && u.password === formData.password
            );

            if (user) {
                // Use AsyncStorage or another method to store user data
                // AsyncStorage.setItem('user', JSON.stringify(user));
                setSuccessMessage('Вы успешно вошли!');
                login();
                navigation.navigate('Profile', {user});
            } else {
                setError('Неверное имя пользователя или пароль.');
            }
        } catch (err) {
            setError('Ошибка при авторизации. Попробуйте позже.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Авторизация</Text>
            <Icon name='mood' size={60} />
            <View>
                <Text>Имя пользователя</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Имя пользователя"
                    value={formData.username}
                    onChangeText={(text) => handleChange('username', text)}
                />
                <Text>Пароль</Text>
                <TextInput
                    style={styles.input}
                    placeholder="пароль"
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                {error && <Text style={styles.error}>{error}</Text>}
                {successMessage && <Text style={styles.success}>{successMessage}</Text>}
            </View>
            <Icon name='arrow-back' size={60} onPress={() => navigation.navigate("Main")}/>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#0B63F6',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Auth;
