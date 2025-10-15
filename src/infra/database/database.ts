import { type SQLiteDatabase } from "expo-sqlite";

export async function db(database: SQLiteDatabase) {
  // cria tabela se não existir
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      startTime TEXT NOT NULL,
      endTime TEXT NOT NULL,
      priority TEXT NOT NULL,
      alert INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    );
  `);

  // adiciona a coluna notificationId se não existir
  try {
    await database.execAsync(`
      ALTER TABLE tasks ADD COLUMN notificationId TEXT;
    `);
  } catch (error: any) {
    // se já existe, o SQLite vai dar erro, então ignoramos
    if (!String(error).includes("duplicate column")) {
      console.error("Erro ao tentar adicionar coluna notificationId:", error);
    }
  }
}
