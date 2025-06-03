// src/pages/AdminBookGenre.tsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminBookGenre() {
  const [books, setBooks] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchBooksAndGenres = () => {
    api.get("libros/")
      .then(res => setBooks(res.data))
      .catch(console.error);

    api.get("generos/")
      .then(res => setGenres(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchBooksAndGenres();
  }, []);

  const handleAssociate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("admin/libros/generos/", {
        book_id: selectedBook,
        genre_id: selectedGenre,
      });
      alert("Libro asociado al género correctamente.");
      setSelectedBook("");
      setSelectedGenre("");
    } catch (error) {
      console.error(error);
      alert("Error al asociar libro al género.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Asociar Libro a Género</h2>

      <form onSubmit={handleAssociate} className="space-y-4">
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="border w-full p-2 rounded"
          required
        >
          <option value="">Seleccione un Libro</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border w-full p-2 rounded"
          required
        >
          <option value="">Seleccione un Género</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Asociar
        </button>
      </form>
    </div>
  );
}
