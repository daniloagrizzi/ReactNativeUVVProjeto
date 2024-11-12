import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (name && email && password) {
      const userData = { name, email, password };
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setSuccessModalVisible(true); 
      } catch (error) {
        setErrorMessage('Erro ao salvar dados. Tente novamente.');
        setModalVisible(true);
      }
    } else {
      setErrorMessage('Por favor preencha todos os campos corretamente.');
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.linkButton}>
        <Text style={styles.linkText}>Já possui cadastro? Entre aqui</Text>
      </TouchableOpacity>

      {/* Modal de erro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>Cadastro realizado com sucesso!</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
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
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
