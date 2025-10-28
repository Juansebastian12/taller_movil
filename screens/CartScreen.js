import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen() {
  const { cart } = useContext(CartContext);

  // Calcular total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Carrito de compras (aún vacío)</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Cantidad: {item.quantity}</Text>
            <Text>Precio: ${item.price.toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#666' },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  name: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  totalContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'right' },
});
