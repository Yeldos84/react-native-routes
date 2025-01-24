import {Button, View, Text} from "react-native";

const Profile = ({navigation, route}) => {
  const {age, name} = route.params
  return (
    <View>
      <Text>Профиль</Text>
      <Text>Name: {name} </Text>
      <Text>Age: {age} </Text>
      <Button title="Главная" onPress={()=>{navigation.navigate("Main")}}/>
    </View>
  );
};

export default Profile;
