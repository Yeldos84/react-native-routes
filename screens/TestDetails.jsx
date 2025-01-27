import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchTest, fetchQuestions, fetchAnswers } from '../components/Api';
// import AnswersList from '../components/AnswersList'; 
// import BackButton from '../components/BackButton';

const TestDetails = () => {
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
        setTestResult(isPassed ? 'Вы прошли тест!' : 'Вы не прошли тест.');
        Alert.alert('Результат', `Вы ${isPassed ? 'прошли' : 'не прошли'} тест. Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов.`);
        setSelectedAnswers({});
    };

    if (testLoading || questionsLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (testError) {
        return <Text style={styles.error}>Ошибка при загрузке теста</Text>;
    }

    if (questionsError) {
        return <Text style={styles.error}>Ошибка при загрузке вопросов</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{test?.title}</Text>
            <View>
                {questions.map((question) => (
                    <View key={question.id} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{question.text}</Text>
                        <AnswersList
                            questionId={question.id}
                            selectedAnswer={selectedAnswers[question.id]}
                            onChange={(answerText) => handleAnswerChange(question.id, answerText)}
                        />
                    </View>
                ))}
            </View>
            <Button title="Ответить" onPress={handleSubmitAll} />
            {error && <Text style={styles.error}>{error}</Text>}
            {correctCount !== null && (
                <View>
                    <Text style={styles.resultTitle}>Результат:</Text>
                    <Text>{testResult}</Text>
                    <Text>
                        Вы ответили правильно на {correctCount} из {questions.length} вопросов.
                    </Text>
                </View>
            )}
            <BackButton />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default TestDetails;
