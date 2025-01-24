

import React, { useContext, useEffect, useState } from 'react';
import {Button, View, Text, FlatList} from "react-native";

const  Fetch = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [err, setErr] = useState(null);
  const dataUrl = 'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5';
  console.log("f");
  

  useEffect(() => {
    fetch(dataUrl)
      .then((resp) => 
        resp.json())
        .then((json) => {
            setData(json);
            setLoding(true);
        })
      .catch((error) => {
        setErr(error);
        setErr(error);
        setLoding(false);
      });
  }, []);


  return (
      <>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View >
          <Text style= {{fontSize:20}} >
            {item.title}
          </Text>
          <Text style={{color:"red"}} >
          {item.body}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
    <Button title="Главная" onPress={()=>{navigation.navigate("Main")}}/>
    </>
  );
};


export default Fetch;