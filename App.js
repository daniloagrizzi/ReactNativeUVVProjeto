import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Welcome from './pages/Welcome'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Página Inicial' }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ title: 'Cadastro' }} 
        />
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ title: 'Bem-vindo' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
