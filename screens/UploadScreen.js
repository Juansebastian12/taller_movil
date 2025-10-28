import React, { useState, useEffect } from "react";
import { View, Button, Image, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../services/cloudinaryService";

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Solicitar permiso a la galería
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Necesitamos acceso a tus fotos para subir imágenes");
      }
    })();
  }, []);

  // Seleccionar imagen de la galería
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Subir imagen a Cloudinary
  const handleUpload = async () => {
    if (!image) {
      Alert.alert("Error", "Selecciona una imagen primero");
      return;
    }
    setLoading(true);
    try {
      const url = await uploadImageToCloudinary(image);
      Alert.alert("Éxito", "Imagen subida correctamente!");
      console.log("URL de la imagen:", url);
      setImage(null);
    } catch (error) {
      Alert.alert("Error", "No se pudo subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      <Button title="Subir Imagen" onPress={handleUpload} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
    </View>
  );
}
