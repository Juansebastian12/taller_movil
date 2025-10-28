import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import products from '../services/products';
import { CartContext } from '../context/CartContext';

export default function ProductsScreen() {
  const { addToCart } = useContext(CartContext);

  const handleAdd = (item) => {
    addToCart(item);

    // ✅ Alerta simple
    alert(
      'Producto agregado',
      `${item.name} fue añadido al carrito`,
      [{ text: 'OK', style: 'default' }],
      { cancelable: true } 
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toLocaleString()}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAdd(item)} 
            >
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f4f4' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  price: { fontSize: 16, color: '#555', marginBottom: 8 },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

