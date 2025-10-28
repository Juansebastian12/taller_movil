import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import sqliteService from '../services/sqliteService';
import uuid from 'react-native-uuid';

// Cloudinary
const CLOUD_NAME = 'dkbbvp3ol';
const UPLOAD_PRESET = 'react_app_upload';

export default function Formulario({ onUsuarioUpdate }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sqliteService.initDB();
  }, []);

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) setImagen(result.assets[0].uri);
  };

  const subirImagenCloudinary = async (uri) => {
    const data = new FormData();
    data.append('file', { uri, type: 'image/jpeg', name: 'upload.jpg' });
    data.append('upload_preset', UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    return result.secure_url;
  };

  const guardarUsuario = async () => {
    if (!nombre || !email || !imagen) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await subirImagenCloudinary(imagen);

      const id = uuid.v4(); // Generamos un ID único
      sqliteService.upsertUsuario(id, { nombre, email, imagen: imageUrl });

      if (onUsuarioUpdate) onUsuarioUpdate();
      Alert.alert('Éxito', 'Usuario guardado correctamente');

      setNombre('');
      setEmail('');
      setImagen(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Formulario Usuario</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />

      {imagen && (
        <Image source={{ uri: imagen }} style={{ width: 100, height: 100, marginVertical: 10 }} />
      )}

      <Button
        title={loading ? "Guardando..." : "Guardar Usuario"}
        onPress={guardarUsuario}
        disabled={loading}
      />
    </View>
  );
}
