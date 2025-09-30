import { type SQLiteDatabase } from "expo-sqlite";

export async function db(database: SQLiteDatabase) {
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
}
