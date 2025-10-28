// services/sqliteService.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('usuarios.db');

// Inicializa la tabla
const initDB = () => {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY NOT NULL,
      nombre TEXT,
      email TEXT,
      imagen TEXT
    );`
  );
};

// Insertar o actualizar usuario
const upsertUsuario = (id, { nombre = null, email = null, imagen = null } = {}) => {
  const result = db.runSync(
    `INSERT OR REPLACE INTO usuarios (id, nombre, email, imagen)
     VALUES (?,?,?,?);`,
    [id, nombre, email, imagen]
  );
  return result;
};

// Obtener usuario por ID
const getUsuarioById = (id) => {
  const row = db.getFirstSync(
    `SELECT * FROM usuarios WHERE id = ?;`,
    [id]
  );
  return row || null;
};

// Obtener el último usuario agregado
const getLastUsuario = () => {
  const row = db.getFirstSync(
    `SELECT * FROM usuarios ORDER BY id DESC LIMIT 1;`
  );
  return row || null;
};

// Eliminar usuario por ID
const deleteUsuarioById = (id) => {
  const result = db.runSync(
    `DELETE FROM usuarios WHERE id = ?;`,
    [id]
  );
  return result;
};

export default {
  initDB,
  upsertUsuario,
  getUsuarioById,
  getLastUsuario, // ✅ ahora sí existe
  deleteUsuarioById
};
