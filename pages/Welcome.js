import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {name}! O que você deseja explorar hoje? 🌟</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('BuscarMusicas')}
      >
        <Text style={styles.optionText}>🎵 Buscar Músicas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('BuscarFilmes')}
      >
        <Text style={styles.optionText}>🎬 Buscar Filmes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('BuscarLivros')}
      >
        <Text style={styles.optionText}>📚 Buscar Livros</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('Favoritos')}  // Navegando para a tela de Favoritos
      >
        <Text style={styles.optionText}>⭐ Meus Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212529',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#f8f9fa',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  optionButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#adb5bd',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    color: '#212529',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ef233c',
    borderRadius: 10,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
