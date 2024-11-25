import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Hook para navegação
import CardItem from '../Components/CardItem'; // Importando o CardItem

export default function Favoritos() {
  const navigation = useNavigation(); // Usando o hook para navegação
  const [favorites, setFavorites] = useState([]);

  // Carregar os favoritos do AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };
    loadFavorites();
  }, []);

  // Remover um item dos favoritos
  const removeFromFavorites = async (itemToRemove) => {
    const updatedFavorites = favorites.filter(fav => 
      fav.trackId !== itemToRemove.trackId && fav.collectionId !== itemToRemove.collectionId
    );

    // Atualiza o estado e o AsyncStorage
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Notifica o usuário sobre a remoção
    Alert.alert('Sucesso', 'Item removido dos favoritos!');
  };

  // Função que será chamada quando um item for pressionado
  const handleItemPress = (item) => {
    // Exemplo de navegação, você pode navegar para uma tela de detalhes
    navigation.navigate('DetalhesItem', { item });
  };

  // Renderizar o item da lista de favoritos utilizando o CardItem
  const renderItem = ({ item }) => (
    <CardItem item={item} onPress={handleItemPress} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus itens favoritos</Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>Você não tem favoritos ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.trackId?.toString() || item.collectionId?.toString()}
          renderItem={renderItem}
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
  },
  title: {
    fontSize: 24,
    color: '#f8f9fa',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#f8f9fa',
    textAlign: 'center',
    marginTop: 30,
  },
});
