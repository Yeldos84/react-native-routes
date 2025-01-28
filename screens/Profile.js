import { Button, View, Text } from "react-native";
import { Icon } from 'react-native-elements';

const Profile = ({ navigation, route }) => {
  const { user } = route.params
  return (
    <View>
      <Text>Профиль:</Text>
      <View style={{alignItems:'flex-start'}}>
        {user ? <Icon name='mood' size={60} color='green' /> : <Icon name='mood-bad' size={60} color='red'/>}
        <Text>Имя пользователя: <Text style={{fontWeight:600}}>{user?.username}</Text> </Text>
      </View>

      {/* <Text>Age: {age} </Text>
      <Text>Phone: {phone} </Text>
      <Text>email: {email} </Text> */}
      <Button title="Главная" onPress={() => { navigation.navigate("Main") }} />
    </View>
  );
};

export default Profile;
