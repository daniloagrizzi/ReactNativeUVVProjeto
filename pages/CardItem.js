// CardItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CardItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image style={styles.cardImage} source={{ uri: item.artworkUrl100 }} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.trackName || item.collectionName}</Text>
        <Text style={styles.cardSubTitle}>{item.artistName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  cardSubTitle: {
    fontSize: 14,
    color: '#DDD',
  },
});
