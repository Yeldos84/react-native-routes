import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchTest, fetchQuestions, fetchAnswers } from '../components/Api';
import { Icon } from 'react-native-elements';


const AnswersList = ({ questionId, selectedAnswer, onChange }) => {
    const { data: answers, isLoading, isError } = useQuery({
      queryKey: ['answers', questionId],
      queryFn: () => fetchAnswers(questionId),
    });
  
    if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (isError) return <Text style={styles.error}>Ошибка при загрузке ответов</Text>;
  
    return (
      <FlatList
        data={answers}
        keyExtractor={(item) => item.text}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChange(item.text)} style={styles.item}>
            <Text style={selectedAnswer === item.text ? styles.selectedText : styles.text}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
};

const TestPage = () => {
  const route = useRoute();
  const { testId } = route.params;

  const { data: test, isLoading: testLoading, isError: testError } = useQuery({
    queryKey: ['test', testId],
    queryFn: () => fetchTest(testId),
  });

  const { data: questions, isLoading: questionsLoading, isError: questionsError } = useQuery({
    queryKey: ['questions', testId],
    queryFn: () => fetchQuestions(testId),
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(null);
  const [error, setError] = useState(null);
  const [testResult, setTestResult] = useState(null);

  const handleAnswerChange = (questionId, answerText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerText,
    }));
  };

  const handleSubmitAll = async () => {
    setError(null);
    let correctAnswers = 0;

    for (const question of questions) {
      if (!selectedAnswers[question.id]) {
        setError('Пожалуйста, ответьте на все вопросы перед отправкой!');
        return;
      }
    }

    for (const question of questions) {
      const answers = await fetchAnswers(question.id);
      const selectedAnswer = selectedAnswers[question.id];
      const isCorrect = answers.find((answer) => answer.text === selectedAnswer)?.is_correct;

      if (isCorrect) {
        correctAnswers++;
      }
    }

    setCorrectCount(correctAnswers);

    const isPassed = correctAnswers / questions.length >= 0.5;
    setTestResult(isPassed ? <Text>Вы прошли тест!<Icon name='thumb-up-alt' size={60} color='green' /></Text> : <Text>Вы не прошли тест. <Icon name='thumb-down-alt' size={60} color='red' /></Text> );

    setSelectedAnswers({});
  };

  if (testLoading || questionsLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (testError) return <Text style={styles.error}>Ошибка при загрузке теста</Text>;
  if (questionsError) return <Text style={styles.error}>Ошибка при загрузке вопросов</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{test?.title}</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.text}</Text>
            <AnswersList
              questionId={item.id}
              selectedAnswer={selectedAnswers[item.id]}
              onChange={(answerText) => handleAnswerChange(item.id, answerText)}
            />
          </View>
        )}
      />
      <Button color={'#008000'} title="Ответить" onPress={handleSubmitAll} />
      {error && <Text style={styles.error}>{error}</Text>}
      {correctCount !== null && (
        <View style={styles.result}>
          <Text style={styles.resultText}>{testResult}</Text>
          <Text>Вы ответили правильно на {correctCount} из {questions.length} вопросов.</Text>
        </View>
      )}
      <Button title="Главная" onPress={() => navigation.navigate("Main")} />
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
  result: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  text: {
    color: 'black',
  },
  selectedText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default TestPage;
