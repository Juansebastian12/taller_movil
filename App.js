import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CartProvider } from './context/CartContext';
import sqliteService from './services/sqliteService';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    // ⚡ Intentar obtener la imagen guardada del usuario en SQLite
    sqliteService.getUser().then(user => {
      if (user && user.imageUri) setUserImage(user.imageUri);
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, height: 60 },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Productos') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Carrito') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Perfil') {
            return userImage ? (
              <Image
                source={{ uri: userImage }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? '#007bff' : 'transparent',
                }}
              />
            ) : (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={color}
              />
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Productos" component={ProductsScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    sqliteService.initDB(); // ✅ Crea la tabla si no existe
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTitle: 'Crear cuenta' }} />
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: 'Perfil de Usuario' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
