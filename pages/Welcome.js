import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params;

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopSongs = async () => {
    try {
      const response = await fetch('https://itunes.apple.com/search?term=rock&country=BR&entity=song&limit=10&sort=recent');
      const data = await response.json();
      
      const topSongs = data.results.map((song) => ({
        id: song.trackId.toString(),
        name: song.trackName,
        artist: song.artistName,
        imageUrl: song.artworkUrl100,
      }));
      
      setSongs(topSongs);
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar as músicas:', error);
    }
  };

  useEffect(() => {
    fetchTopSongs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {name}! Aqui estão as musiquinhas mais escutadas no Brasil em 2017 🙈</Text>

      {loading ? (
        <Text>Carregando músicas...</Text>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.songItem}>
              <Image style={styles.songImage} source={{ uri: item.imageUrl }} />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.name}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  songInfo: {
    flexDirection: 'column',
  },
  songTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  songArtist: {
    fontSize: 14,
    color: '#555',
  },
});
