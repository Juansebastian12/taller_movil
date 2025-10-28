import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Formulario from '../components/Formulario';
import sqliteService from '../services/sqliteService';

export default function HomeScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    cargarUltimoUsuario();
  }, []);

  const cargarUltimoUsuario = () => {
    const lastUser = sqliteService.getLastUsuario();
    if (lastUser) setUsuario(lastUser);
  };

  const handleViewProfile = () => {
    if (!usuario) return;
    navigation.navigate('Profile', {
      nombre: usuario.nombre,
      email: usuario.email,
      imagen: usuario.imagen,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}> Bienvenido a comidas rápidas App </Text>
      <Text style={styles.subtitle}>Explora nuestras comidas rápidas deliciosas </Text>

      {usuario && <Image source={{ uri: usuario.imagen }} style={styles.avatar} />}

      <TouchableOpacity style={styles.profileButton} onPress={handleViewProfile}>
        <Text style={styles.profileText}>Ver Perfil</Text>
      </TouchableOpacity>

      <Formulario onUsuarioUpdate={cargarUltimoUsuario} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#eaf4f4', alignItems: 'center', justifyContent: 'center', padding: 20 },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  profileButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 10, marginBottom: 15 },
  profileText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
