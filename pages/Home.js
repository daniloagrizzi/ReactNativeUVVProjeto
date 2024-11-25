import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const { email: storedEmail, password: storedPassword, name } = JSON.parse(userData);
      if (email === storedEmail && password === storedPassword) {
        navigation.navigate('Welcome', { name });
      } else if (email !== storedEmail) {
        setErrorMessage('Email incorreto.');
        setModalVisible(true); 
      } else if (password !== storedPassword) {
        setErrorMessage('Senha incorreta.');
        setModalVisible(true); 
      }
    } else {
      setErrorMessage('Nenhum usuário cadastrado.');
      setModalVisible(true); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputSenha}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Text>{passwordVisible ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.linkButton}>
        <Text style={styles.linkText}>Não possui cadastro? Crie uma conta</Text>
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
            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212529',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: '#f8f9fa',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#495057',
    width: '90%',
    marginBottom: 15,
    color: '#f8f9fa',
    fontSize: 18,
    borderRadius: 10,
    padding: 10,
  },
  passwordContainer: {
    width: '90%',
    marginBottom: 15,
    position: 'relative',
  },
  inputSenha: {
    backgroundColor: '#495057',
    width: '100%',
    fontSize: 18,
    color: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  button: {
    backgroundColor: '#ffc300',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 19,
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#dee2e6',
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
    backgroundColor: '#343a40',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8f9fa',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#ef233c',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});