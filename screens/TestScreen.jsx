import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchTests } from '../components/Api';
import { useNavigation } from '@react-navigation/native'; 


const Tests = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tests'],
    queryFn: fetchTests,
  });

  const navigation = useNavigation(); 

  if (isLoading) return <Text style={styles.loading}>Загрузка тестов...</Text>;
  if (isError) return <Text style={styles.error}>Ошибка загрузки тестов</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Тесты</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TestDetails', { testId: item.id })}
            >
              <Text style={styles.buttonText}>Начать тест</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Главная" onPress={() => { navigation.navigate("Main") }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Tests;
