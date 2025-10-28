import React, { useState } from "react";
import { View, Button, Image, ActivityIndicator, Alert } from "react-native";
import { selectAndUploadImage } from "./cloudinaryService";

export default function UploadImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    try {
      const url = await selectAndUploadImage();
      if (url) {
        setImageUrl(url);
        Alert.alert("¡Éxito!", "Imagen subida correctamente");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Seleccionar y Subir Imagen" onPress={handleUpload} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, marginTop: 10 }} />}
    </View>
  );
}
