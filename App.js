import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartProvider } from './context/CartContext';
import ProfileScreen from './screens/ProfileScreen';
import { useEffect } from 'react';
import sqliteService from './services/sqliteService'; // ✅ Importar tu servicio SQLite

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, height: 60 },
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Productos" component={ProductsScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // ⚡ Inicializar SQLite al arrancar la app
  useEffect(() => {
    sqliteService.initDB() // Crea la tabla si no existe
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
