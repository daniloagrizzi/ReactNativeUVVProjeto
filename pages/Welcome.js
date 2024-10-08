import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function Welcome() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params;

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Olá, {name}!</Text>
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
});
