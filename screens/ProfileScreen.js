import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Formulario from '../components/Formulario';
import sqliteService from '../services/sqliteService';

export default function ProfileScreen({ route }) {
  const [usuario, setUsuario] = useState(route.params || null);

  useEffect(() => {
    if (!usuario) {
      const lastUser = sqliteService.getLastUsuario();
      if (lastUser) setUsuario(lastUser);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {usuario?.imagen ? (
        <Image source={{ uri: usuario.imagen }} style={styles.avatar} />
      ) : (
        <Image source={require('../assets/default-avatar.png')} style={styles.avatar} />
      )}

      {usuario && (
        <>
          <Text style={styles.nombre}>{usuario.nombre}</Text>
          <Text style={styles.email}>{usuario.email}</Text>
        </>
      )}

      {/* Aquí mostramos el formulario solo en la pantalla de perfil */}
      <Formulario onUsuarioUpdate={() => {
        const updatedUser = sqliteService.getLastUsuario();
        if (updatedUser) setUsuario(updatedUser);
      }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  nombre: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  email: { fontSize: 16, color: '#666', marginBottom: 20 },
});

