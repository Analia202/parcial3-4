// src/pages/AdminBooks.tsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");

  const fetchBooks = () => {
    api.get("libros/")
      .then(res => setBooks(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("admin/libros/", { title, author, price, isbn, description });
      alert("Libro creado con éxito.");
      fetchBooks();
      setTitle("");
      setAuthor("");
      setPrice(0);
      setIsbn("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Error al crear libro.");
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await api.delete(`admin/libros/${id}/`);
      alert("Libro eliminado.");
      fetchBooks();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar libro.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Administrar Libros</h2>

      {/* Formulario Crear Libro */}
      <form onSubmit={handleCreateBook} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2 rounded"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          Crear Libro
        </button>
      </form>

      {/* Lista de Libros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{book.title}</h3>
              <p>{book.author}</p>
              <p>${book.price}</p>
            </div>
            <button
              onClick={() => handleDeleteBook(book.id)}
              className="text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
