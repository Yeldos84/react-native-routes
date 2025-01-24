import {Button, View, Text} from "react-native";

const Contacts = ({navigation, route}) => {
  const {id, name} = route.params
  return (
    <View>
      <Text>Контакты</Text>
      <Text>{id} - {name}</Text>
      <Button title="Главная" onPress={()=>{navigation.navigate("Main")}}/>
    </View>
  );
};

export default Contacts;
