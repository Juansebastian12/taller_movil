import React, { useState } from 'react';
import {View,Text,TextInput,Button,StyleSheet,Alert,Platform} from 'react-native';

import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña');
      return;
    }

    try {
      
      await signInWithEmailAndPassword(auth, email, password);

      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        Alert.alert('Bienvenido', 'Inicio de sesión correcto ');
      } else {
        alert('Inicio de sesión correcto ');
      }

      
      navigation.replace("MainTabs");
    } catch (error) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
            Alert.alert('Error', error.message);
        } else {
          alert("Error: " + error.message);
        }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.buttonWrapper}>
          <Button title="Ingresar" onPress={Login} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Crear cuenta"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  form: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonWrapper: {
    width: '100%',
    marginVertical: 8,
  },
});
