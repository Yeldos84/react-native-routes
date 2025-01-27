import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useQuery,} from '@tanstack/react-query';
import { fetchTests, fetchQuestions, fetchAnswers, fetchUsers } from '../components/Api';
// import AppHeader from '../components/Header';
// import BackButton from '../components/BackButton';

const DataSection = ({ title, isLoading, isError, data, itemKey, itemText }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.title}>{title}</Text>
    {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    {isError && <Text style={styles.error}>Ошибка при загрузке {title.toLowerCase()}</Text>}
    {data && (
      <ScrollView>
        {data.map((item) => (
          <View key={item[itemKey]} style={styles.item}>
            <Text>{item[itemText]}</Text>
          </View>
        ))}
      </ScrollView>
    )}
  </View>
);

const ApiPage = () => {
  const { data: tests, isLoading: testsLoading, isError: testsError } = useQuery({
    queryKey: ['tests'],
    queryFn: fetchTests,
    
  });
console.log(tests);
  const { data: questions, isLoading: questionsLoading, isError: questionsError } = useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });

  const { data: answers, isLoading: answersLoading, isError: answersError } = useQuery({
    queryKey: ['answers'],
    queryFn: fetchAnswers,
  });

  const { data: users, isLoading: usersLoading, isError: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <>
      
      <DataSection
        title="Тесты"
        isLoading={testsLoading}
        isError={testsError}
        data={tests}
        itemKey="id"
        itemText="title"
      />
      <DataSection
        title="Вопросы"
        isLoading={questionsLoading}
        isError={questionsError}
        data={questions}
        itemKey="id"
        itemText="text"
      />
      <DataSection
        title="Ответы"
        isLoading={answersLoading}
        isError={answersError}
        data={answers}
        itemKey="id"
        itemText="text"
      />
      <DataSection
        title="Пользователи"
        isLoading={usersLoading}
        isError={usersError}
        data={users}
        itemKey="id"
        itemText="username"
      />
      <Button title="Главная" onPress={() => { navigation.navigate("Main") }} />
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  error: {
    color: 'red',
  },
});

export default ApiPage;
