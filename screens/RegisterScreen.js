// RegisterScreen.js – versi diperbaiki dan valid
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Pendaftaran Gagal', 'Isi semua kolom');
      return;
    }

    await AsyncStorage.setItem('registeredUsername', username);
    await AsyncStorage.setItem('registeredPassword', password);

    Alert.alert('Berhasil', 'Akun berhasil dibuat. Silakan login.');
    navigation.replace('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff', flex: 1 }]}>
      <Text style={styles.title}>Daftar Akun</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
