import React, { useContext, useEffect, useState } from 'react';
import { Button, View, ActivityIndicator, Text, FlatList, Alert, Modal, StyleSheet, Pressable } from "react-native";

const Fetch = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dataUrl = 'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5';

  useEffect(() => {
    fetch(dataUrl)
      .then((resp) => resp.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        setErr(error);
        setLoading(false);
        setModalVisible(true);
      });
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    setErr(null);
    navigation.navigate("Main");
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 20 }}>{item.title}</Text>
            <Text style={{ color: "red" }}>{item.body}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Главная" onPress={() => { navigation.navigate("Main") }} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ошибка: {err?.message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Fetch;
