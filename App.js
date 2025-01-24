import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from "react-native";
import Main from "./screens/Main";
import Contacts from "./screens/Contacts";
import Profile from './screens/Profile';
import Counter from './screens/Counter';
import  Fetch  from './screens/Fetch';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{
            title: 'Главная',
            headerStyle: {
              backgroundColor: '#2098a8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <Main {...props}/>
          </View>
          }
        />
        <Stack.Screen
          name="Contacts"
          options={{
            title: 'Контакты',
            headerStyle: {
              backgroundColor: '#a83020',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <Contacts {...props}/>
          </View>
          }
        />
        <Stack.Screen
          name="Profile"
          options={{
            title: 'Профиль',
            headerStyle: {
              backgroundColor: '#2098a8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <Profile {...props}/>
          </View>
          }
        />
        <Stack.Screen
          name="Counter"
          options={{
            title: 'Counter',
            headerStyle: {
              backgroundColor: '#2098a8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <Counter {...props}/>
          </View>
          }
        />
        <Stack.Screen
          name="GetPost"
          options={{
            title: 'Fetch',
            headerStyle: {
              backgroundColor: '#2098a8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <Fetch {...props}/>
          </View>
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
