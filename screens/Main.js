import { StyleSheet, Button, View, Text, Image } from "react-native";
import img from "../assets/favicon.png";
import img2 from "../assets/illustr1.svg";

const Main = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.image} source={img} />
          <Text style={styles.welcomeText}>Добро пожаловать на сайт Курсов повышения квалификации!</Text>
          <Image style={styles.image2} source={img2} />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonWrapper}>
            <Button color="orange" title="Регистрация" onPress={() => navigation.navigate("Register", "")} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Вход" onPress={() => navigation.navigate("Auth", "")} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button color="#98a820" title="Профиль" onPress={() => navigation.navigate("Profile", {
              id: 1,
              name: 'Alex',
              age: 40,
              email: 'user@company.kz',
              phone: 87771234567
            })} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button color="green" title="Тесты" onPress={() => navigation.navigate("Tests", "")} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button color="gray" title="Api" onPress={() => navigation.navigate("Api", "")} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    minHeight: 600,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  image2: {
    width: '80%', 
    height: undefined,
    aspectRatio: 1, 
    resizeMode: 'contain',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  buttonWrapper: {
    width: '80%',
    marginBottom: 10,
  },
});

export default Main;
