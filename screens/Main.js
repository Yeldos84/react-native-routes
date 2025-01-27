import { StyleSheet, Button, View, Text, Image } from "react-native";

import img from "../assets/favicon.png"

const Main = ({ navigation }) => {

  return (
    <View>
      <View style={{ flexBasis: "100px", backgroundColor: '#9e9e9e', alignItems: "center", justifyContent:'center' }}> 
        <Image
        style={styles.image}
        source={img}
        />
        <Text>Добро пожаловать в "Мой Банк"!</Text>
        </View>
      {/* <Text style={{flexBasis:100}}>Главная страница</Text> */}
      
      <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', backgroundColor:'#9e9e9e'}}>
        <Button style={{flexBasis:100}} title="Счет в банке" onPress={() => {
          navigation.navigate("Account", "")
        }} />
        <Button color="#98a820" title="Профиль" onPress={() => {
          navigation.navigate("Profile", {
            id: 1,
            name: 'Alex',
            age: 40,
            email: 'user@company.kz',
            phone: 87771234567
          })
        }} />
        {/* <Button color="#a83020" title="Counter" onPress={() => {
          navigation.navigate("Counter", ""
          )
        }} /> */}
        <Button color="green" title="Помощь" onPress={() => {
          navigation.navigate("Fetch", ""
          )
        }} />
         <Button color="green" title="Api" onPress={() => {
          navigation.navigate("Api", ""
          )
        }} />
        <Button color="green" title="Tests" onPress={() => {
          navigation.navigate("Tests", ""
          )
        }} />
         <Button color="green" title="TestDetails" onPress={() => {
          navigation.navigate("TestDetails", ""
          )
        }} />
      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
});

export default Main;
