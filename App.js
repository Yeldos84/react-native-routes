import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from "react-native";
import Main from "./screens/Main";
import Contacts from "./screens/Account";
import Profile from './screens/Profile';
import Counter from './screens/Account';
import  Fetch  from './screens/Fetch';
import ApiPage from './screens/Apiscreen';
import Tests from './screens/TestScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TestDetails from './screens/TestDetails';
import Auth from './screens/Auth';
import { AuthProvider } from './screens/AuthContext';
import Register from './screens/Register';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          
          name="Main"
          options={{
            title: 'Testter.kz',
            headerStyle: {
              backgroundColor: '#753ef9',
              
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
          name="Register"
          options={{
            title: 'Регистрация',
            headerStyle: {
              backgroundColor: '#a83020',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <Register {...props}/>
          </View>
          }
        />
        <Stack.Screen
          name="Auth"
          options={{
            title: 'Вход',
            headerStyle: {
              backgroundColor: '#a83020',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <Auth {...props}/>
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
          name="Fetch"
          options={{
            title: 'Помощь',
            headerStyle: {
              backgroundColor: 'green',
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
        <Stack.Screen
          name="Api"
          options={{
            title: 'Api',
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <ApiPage {...props}/>
          </View>
          }
        />
        <Stack.Screen
          name="Tests"
          options={{
            title: 'Tests',
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <Tests {...props}/>
          </View>
          }
        />
        <Stack.Screen
          name="TestDetails"
          options={{
            title: 'TestDetails',
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
          }}
          component={(props)=><View>
            <TestDetails {...props}/>
          </View>
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  </QueryClientProvider>
  </AuthProvider>
  );
}
