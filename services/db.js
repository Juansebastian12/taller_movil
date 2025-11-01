// services/db.js
import * as SQLite from 'expo-sqlite';

// Función que abre la base de datos solo cuando el runtime está listo
export async function getDB() {
  return await SQLite.openDatabaseAsync('app.db');
}

// Inicializar base de datos
export async function initDB() {
  const db = await getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    );
  `);
}

// Sembrar productos solo si la tabla está vacía
export async function seedProducts() {
  const db = await getDB();
  const result = await db.getAllAsync('SELECT * FROM products');
  if (result.length === 0) {
    await db.runAsync(`
      INSERT INTO products (name, price)
      VALUES
      ('Hamburguesa Clásica', 25000),
      ('Pizza Familiar', 48000),
      ('Perro Caliente', 18000),
      ('Gaseosa 1.5L', 8000)
    `);
  }
}

// Obtener productos
export async function getProducts() {
  const db = await getDB();
  return await db.getAllAsync('SELECT * FROM products');
}
