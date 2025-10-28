import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProductCard({ product, onAdd }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Button title="Agregar al carrito" onPress={() => onAdd(product)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, marginBottom: 8 },
});
