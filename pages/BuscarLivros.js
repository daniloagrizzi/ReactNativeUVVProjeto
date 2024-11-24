// BuscarLivros.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CardItem from './CardItem'; // Componente de Card
import { useNavigation } from '@react-navigation/native';

export default function BuscarLivros() {
  const [livros, setLivros] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchLivros = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&entity=ebook&limit=10`
      );
      const data = await response.json();
      setLivros(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchLivros(query);
  };

  const handleCardPress = (item) => {
    navigation.navigate('DetalhesItem', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Livros</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do livro"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading ? (
        <Text>Carregando livros...</Text>
      ) : (
        <FlatList
          data={livros}
          keyExtractor={(item) => item.collectionId.toString()}
          renderItem={({ item }) => (
            <CardItem item={item} onPress={handleCardPress} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#191919',
  },
  title: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    padding: 10,
    borderRadius: 7,
    fontSize: 18,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#59BFFF',
    padding: 10,
    width: '90%',
    borderRadius: 7,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
