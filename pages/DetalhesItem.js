// DetalhesItem.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalhesItem({ route, navigation }) {
  const { item } = route.params;
  const [rating, setRating] = useState(0);

  // Carregar a avaliação salva, se houver
  useEffect(() => {
    const loadRating = async () => {
      const savedRating = await AsyncStorage.getItem(`rating-${item.trackId || item.collectionId}`);
      if (savedRating) {
        setRating(Number(savedRating));
      }
    };
    loadRating();
  }, [item]);

  // Salvar a avaliação
  const saveRating = async (newRating) => {
    setRating(newRating);
    await AsyncStorage.setItem(`rating-${item.trackId || item.collectionId}`, newRating.toString());
  };

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
      />

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
    backgroundColor: '#191919',
    padding: 20,
  },
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#DDD',
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  rating: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#59BFFF',
    padding: 10,
    borderRadius: 7,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
