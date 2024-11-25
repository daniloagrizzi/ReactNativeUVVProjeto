import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalhesItem({ route, navigation }) {
  const { item } = route.params;
  const [rating, setRating] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadRating = async () => {
      const savedRating = await AsyncStorage.getItem(`rating-${item.trackId || item.collectionId}`);
      if (savedRating) {
        setRating(Number(savedRating));
      }
    };

    const loadFavorites = async () => {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };

    loadRating();
    loadFavorites();
  }, [item]);

  const saveRating = async (newRating) => {
    setRating(newRating);
    await AsyncStorage.setItem(`rating-${item.trackId || item.collectionId}`, newRating.toString());
  };

  const addToFavorites = async () => {
    if (favorites.length >= 5) {
      setModalVisible(true);
    } else {
      const updatedFavorites = [...favorites, item];
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = async (itemToRemove) => {
    const updatedFavorites = favorites.filter(fav => fav.trackId !== itemToRemove.trackId && fav.collectionId !== itemToRemove.collectionId);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isItemFavorited = favorites.some(fav => fav.trackId === item.trackId || fav.collectionId === item.collectionId);

  return (
    <View style={styles.container}>
      <Image style={styles.itemImage} source={{ uri: item.artworkUrl100 }} />
      <Text style={styles.title}>{item.trackName || item.collectionName}</Text>
      <Text style={styles.subTitle}>{item.artistName}</Text>

      <Text style={styles.ratingTitle}>Avalie este item:</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={40}
        onFinishRating={saveRating}
        startingValue={rating}
        style={styles.rating}
        ratingColor="#ffc300"  // Cor das estrelas
        ratingBackgroundColor="#ddd"  // Cor do fundo das estrelas
        tintColor="#212529"  // Cor de fundo da tela
      />

      {!isItemFavorited ? (
        <TouchableOpacity style={styles.addFavoriteButton} onPress={addToFavorites}>
          <Text style={styles.buttonText}>Adicionar aos Favoritos</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.removeFavoriteButton} onPress={() => removeFromFavorites(item)}>
          <Text style={styles.buttonText}>Remover dos Favoritos</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Você já tem 5 itens nos favoritos!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
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
  itemImage: {
    width: 180,
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#adb5bd',
  },
  title: {
    fontSize: 24,
    color: '#f8f9fa',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#dee2e6',
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    color: '#f8f9fa',
    marginBottom: 12,
  },
  rating: {
    marginBottom: 20,
  },
  addFavoriteButton: {
    backgroundColor: '#ffc300', // Cor do botão "Adicionar aos Favoritos"
    padding: 10,
    width: '80%',
    borderRadius: 7,
    marginBottom: 20,
    alignItems: 'center',
  },
  removeFavoriteButton: {
    backgroundColor: '#ef233c', // Cor do botão "Remover dos Favoritos"
    padding: 10,
    width: '80%',
    borderRadius: 7,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
    //marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#ef233c',
    padding: 10,
    width: '80%',
    borderRadius: 7,
    alignItems: 'center',
  },
  
  button: {
    backgroundColor: '#adb5bd',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
});
