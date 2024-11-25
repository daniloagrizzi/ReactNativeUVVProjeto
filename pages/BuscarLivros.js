import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import CardItem from './CardItem'; // Componente de Card
import { useNavigation } from '@react-navigation/native';

export default function BuscarLivros() {
  const [livros, setLivros] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Para armazenar erros de busca
  const navigation = useNavigation();

  // Função para buscar livros com debounce
  const fetchLivros = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null); // Resetando o erro antes de buscar novamente

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&entity=ebook&limit=10`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setError('Nenhum livro encontrado.');
      }

      setLivros(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      setLoading(false);
      setError('Erro ao buscar livros. Tente novamente.');
    }
  };

  // Chamada para a busca
  const handleSearch = () => {
    fetchLivros(query);
  };

  // Chamada ao pressionar o card
  const handleCardPress = (item) => {
    navigation.navigate('DetalhesItem', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Livros</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do livro"
        placeholderTextColor="#adb5bd"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch} // Chamando busca ao pressionar Enter
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#f8f9fa" style={styles.loadingText} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : livros.length === 0 ? (
        <Text style={styles.noResultsText}>Nenhum livro encontrado.</Text>
      ) : (
        <FlatList
          data={livros}
          keyExtractor={(item) => item.trackId.toString()} // Usando trackId como chave
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
  errorText: {
    color: '#e74c3c', // Vermelho para erros
    fontSize: 16,
    marginTop: 20,
  },
  noResultsText: {
    color: '#f8f9fa', // Texto informando que não há resultados
    fontSize: 16,
    marginTop: 20,
  },
  list: {
    paddingTop: 10,
  },
});
