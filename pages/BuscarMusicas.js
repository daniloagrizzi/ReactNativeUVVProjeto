import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CardItem from '../Components/CardItem';
import { useNavigation } from '@react-navigation/native';

export default function BuscarMusicas() {
  const [musicas, setMusicas] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchMusicas = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=10`
      );
      const data = await response.json();
      setMusicas(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar músicas:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMusicas(query);
  };

  const handleCardPress = (item) => {
    navigation.navigate('DetalhesItem', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Músicas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da música"
        placeholderTextColor="#adb5bd"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Carregando músicas...</Text>
      ) : (
        <FlatList
          data={musicas}
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
    backgroundColor: '#212529', 
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#f8f9fa', 
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#495057', 
    color: '#f8f9fa',
    width: '90%',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: '#adb5bd', 
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
    color: '#212529', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#f8f9fa', 
    fontSize: 16,
    marginTop: 20,
  },
  list: {
    paddingTop: 10,
  },
});
