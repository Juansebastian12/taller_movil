import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import { initDB, seedProducts, getProducts } from '../services/db';

export default function ProductsScreen() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        await initDB();          // ✅ crea tabla si no existe
        await seedProducts();    // ✅ inserta si está vacía
        const data = await getProducts(); // ✅ obtiene los productos
        setProducts(data);       // ✅ los guarda en el estado
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    }
    loadProducts();
  }, []);

  const handleAdd = (item) => {
    addToCart(item);
    Alert.alert('Producto agregado', `${item.name} fue añadido al carrito`);
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando productos...</Text>
      ) : (
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
      )}
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

