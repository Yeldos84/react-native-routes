import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';
import { Icon } from 'react-native-elements';


const Register = () => {
    const navigation = useNavigation();
    const handleNavigationHome = (path) => {
        navigation.navigate(path);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const ButtonSubmit = async () => {
        const userData = { username, password };

        try {
            const response = await axios.post("http://127.0.0.1:8081/api/users/", userData, {
                headers: { 'Content-Type': 'application/json' },
            });
            setMessage('Пользователь успешно создан!');
            setTimeout(() => handleNavigationHome('Auth'), 2000);
            console.log(response.data);
        } catch (error) {
            setMessage('Ошибка при создании пользователя');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Icon name='person-add' size={60}/>
            <View>
                
                <Text style={styles.title}>Регистрация</Text>
                <View>
                    <Text>Имя пользователя</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Имя пользователя"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View>
                    <Text>Пароль</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="пароль"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={ButtonSubmit}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                {message && <Text style={styles.message}>{message}</Text>}
            </View>
            <Icon name='arrow-back' size={60} onPress={() => navigation.navigate("Main")}/>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    width: 250,
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
  message: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Register;
