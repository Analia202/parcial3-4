import { useEffect, useState } from "react";
import api from "../api/api";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  description: string;
  image: string;
  isbn: string;
}

interface BookDetailProps {
  bookId: number;
  onBack: () => void;
}

export default function BookDetail({ bookId, onBack }: BookDetailProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get<Book>(`books/${bookId}/`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error("Error fetching book detail:", error);
      });
  }, [bookId]);

  const handleAddToCart = () => {
    // Suponiendo que el usuario ya tiene un token guardado
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Debes iniciar sesión para agregar al carrito.");
      return;
    }

    api.post(
      "cart/",
      { book: book?.id },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then(() => {
        setMessage("Libro agregado al carrito 🛒");
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
        setMessage("Error al agregar al carrito.");
      });
  };

  if (!book) {
    return <div className="p-5">Cargando libro...</div>;
  }

  return (
    <div className="p-5">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
      >
        ⬅️ Volver
      </button>

      <div className="bg-white shadow rounded-lg p-6">
        <img src={book.image} alt={book.title} className="h-60 object-cover w-full rounded-md mb-4" />
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-700 mb-1">Autor: {book.author}</p>
        <p className="text-lg text-gray-700 mb-1">ISBN: {book.isbn}</p>
        <p className="text-xl text-green-600 font-bold mb-4">${book.price}</p>
        <p className="text-gray-600 mb-4">{book.description}</p>

        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          🛒 Agregar al Carrito
        </button>

        {message && (
          <p className="mt-4 text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
}
