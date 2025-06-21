// LoginScreen.js
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

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const handleLogin = async () => {
    const savedUsername = await AsyncStorage.getItem('registeredUsername');
    const savedPassword = await AsyncStorage.getItem('registeredPassword');

    if (username === savedUsername && password === savedPassword) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.replace('Home');
    } else {
      Alert.alert('Login Gagal', 'Username atau password salah');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#2563eb', marginTop: 20, textAlign: 'center' }}>
          Belum punya akun? Daftar di sini
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, textAlign: 'center', marginBottom: 40, color: '#333' },
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
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});
