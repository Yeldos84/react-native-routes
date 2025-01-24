import {Button, View, Text} from "react-native";

const Main = ({navigation}) => {
  return (
    <View>
      <Text>Главная страница</Text>
      <Button title="Контакты" onPress={()=>{navigation.navigate("Contacts", {
        id: 1,
        name: 'Alex'
      })}}/>
      <Button color="#98a820"  title="Профиль" onPress={()=>{navigation.navigate("Profile", {
        id: 1,
        name: 'Alex',
        age: 40
      })}}/>
      <Button color="#a83020"  title="Counter" onPress={()=>{navigation.navigate("Counter", ""
       )}}/>
       <Button color="gray"  title="Fetch" onPress={()=>{navigation.navigate("GetPost", ""
       )}}/>
    </View>
    
  );
};

export default Main;
