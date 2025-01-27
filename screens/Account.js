import React from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

const Account = ({ navigation, route }) => {
  const { id, name } = route.params;
  const [value, setValue] = React.useState('');
  const [valueminus, setValueMinus] = React.useState('');
  const [textError, setTextError] = React.useState('');
  const [formData, setFormData] = React.useState({
    name: "Alex",
    balance: 100,
    depo: 0
  });

  const balancePlus = ()=>{
    let newBalance = parseFloat(value) + formData.balance;
    setFormData({ ...formData, balance: newBalance });
    setValue('');
    
  };


  const balanceMinus = () => {
    const newBalance = formData.balance - parseFloat(valueminus);
    if (newBalance >= 0){
      
      setFormData({ ...formData, balance: newBalance });
      setValueMinus('');
    }
    else{
      setTextError('Недостаточно средств!')
      console.log('error');
      setValueMinus('');
      
    }
    
  };

  return (
    <View>
      <View style={styles.account}>
        <Text style={styles.bold}>Мой банк</Text>
        <Text>Имя: <Text style={styles.bold}>{formData.name}</Text></Text>
        <Text>Доступный баланс: <Text style={styles.bold}>{formData.balance}</Text></Text>
        <Text>Депозит: <Text style={styles.bold}>{formData.depo}</Text></Text>
      </View>

      <View>
        <View style={{alignItems:"center"}}>
        <TextInput
          style={styles.input}
          placeholder="пополнить счет"
          onChangeText={setValue}
          value={value}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={balancePlus}> 
          <Text style={{color: '#fff'}}>Пополнить</Text>
        </TouchableOpacity>
        </View>
        <View style={{alignItems:"center"}}>
        <TextInput
          style={styles.input}
          placeholder="снять со счета"
          keyboardType="numeric"
          onChangeText={setValueMinus}
          value={valueminus}
        />
        <TouchableOpacity style={styles.button} onPress={balanceMinus}>
          <Text style={{color: '#fff'}}>Снять</Text>
        </TouchableOpacity>

        {formData < 0?
        <Text>fsdf</Text>:<Text style={{color:"red"}}>{textError}</Text>}
        </View>
      </View>
      <Button title="Главная" onPress={() => { navigation.navigate("Main") }} />
    </View>
  );
};

const styles = StyleSheet.create({

  input: {
    flex: 2,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  account: {
    flex: 1,
    alignItems: "center",
    gap: 5

  },
  bold: {
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  button: {
    alignItems: 'center',
    padding: 5,
    justifyContent:"center",
    borderRadius:"20px",
    backgroundColor: 'rgb(168, 48, 32)',
    width:100,
    marginBottom:10
    
    
  },
});


export default Account;
