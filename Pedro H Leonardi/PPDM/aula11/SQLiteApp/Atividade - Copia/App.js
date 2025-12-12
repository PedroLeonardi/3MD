import { SQLiteProvider } from "expo-sqlite";
import BookForm from "./BookForm"; 
import BookList from "./BookList";

export default function App() {
  return (
    <SQLiteProvider
      databaseName="bookDatabase.db"
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            pages INTEGER,
            genre TEXT
          );
          PRAGMA journal_mode=WAL;
          `);
      }}
      options={{ useNewConnection: false }}
    >
    
      <BookForm />
      <BookList />
    </SQLiteProvider>
  );
}