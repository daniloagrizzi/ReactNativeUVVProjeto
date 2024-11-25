// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Welcome from './pages/Welcome';
import BuscarFilmes from './pages/BuscarFilmes';
import BuscarMusicas from './pages/BuscarMusicas';
import BuscarLivros from './pages/BuscarLivros';
import DetalhesItem from './pages/DetalhesItem';
import Favoritos from './pages/Favoritos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Página Inicial' }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Bem-vindo' }} />
        <Stack.Screen name="BuscarFilmes" component={BuscarFilmes} options={{ title: 'Buscar Filmes' }} />
        <Stack.Screen name="BuscarMusicas" component={BuscarMusicas} options={{ title: 'Buscar Músicas' }} />
        <Stack.Screen name="BuscarLivros" component={BuscarLivros} options={{ title: 'Buscar Livros' }} />
        <Stack.Screen name="DetalhesItem" component={DetalhesItem} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="Favoritos" component={Favoritos} options={{ title: 'Favoritos' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
