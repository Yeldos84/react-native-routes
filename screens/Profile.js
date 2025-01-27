import {Button, View, Text} from "react-native";

const Profile = ({navigation, route}) => {
  const {age, name, email, phone} = route.params
  return (
    <View>
      <Text>Профиль:</Text>
      <Text>Name: {name} </Text>
      <Text>Age: {age} </Text>
      <Text>Phone: {phone} </Text>
      <Text>email: {email} </Text>
      <Button title="Главная" onPress={()=>{navigation.navigate("Main")}}/>
    </View>
  );
};

export default Profile;
