import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileScreen({ route }) {
  // Recibimos los datos del usuario vía route.params
  const { nombre, email, imagen } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Imagen de perfil */}
      {imagen ? (
        <Image source={{ uri: imagen }} style={styles.avatar} />
      ) : (
        <Image source={require('../assets/default-avatar.png')} style={styles.avatar} />
      )}

      {/* Datos del usuario */}
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  nombre: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  email: { fontSize: 16, color: '#666' },
});
