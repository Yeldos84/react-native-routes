import React from "react";
import {StyleSheet, Button, View, Text} from "react-native";

const Counter = ({navigation, route}) => {
  const {age, name} = route.params
  const [count, setCount] = React.useState(0);

  const CounterButtonPlus = ()=>{
      setCount(count + 1)
  }
  const CounterButtonMinus = ()=>{
    setCount(count - 1)
}
  return (
    <View>
      <Text>Counter</Text>
      <View style = {{width:100, flexDirection:"row", gap:20, alignItems:"center"}}>
           
           <Button 
           title="-"
           color="gray"
           onPress={CounterButtonMinus}
           />
           <Text>{count}</Text>
           <Button 
           title="+"
           color="#841584"
           onPress={CounterButtonPlus}
           />
      </View>
     
      <Button title="Главная" onPress={()=>{navigation.navigate("Main")}}/>
    </View>
  );
};

export default Counter;
