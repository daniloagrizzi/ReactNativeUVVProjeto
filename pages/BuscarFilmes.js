import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CardItem from '../Components/CardItem'; // Importar o componente Card
import { useNavigation } from '@react-navigation/native';

export default function BuscarFilmes() {
  const [filmes, setFilmes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchFilmes = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&entity=movie&limit=10`
      );
      const data = await response.json();
      setFilmes(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchFilmes(query);
  };

  const handleCardPress = (item) => {
    navigation.navigate('DetalhesItem', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Filmes</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme"
        placeholderTextColor="#adb5bd"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={({ item }) => (
            <CardItem item={item} onPress={handleCardPress} />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212529', // Fundo escuro
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#f8f9fa', // Branco suave
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#495057', // Cinza escuro
    color: '#f8f9fa',
    width: '90%',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: '#adb5bd', // Cinza claro
    padding: 12,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#212529', // Preto suave para contraste
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#f8f9fa', // Texto branco
    fontSize: 16,
    marginTop: 20,
  },
  list: {
    paddingTop: 10,
  },
});
