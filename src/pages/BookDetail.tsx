// src/pages/BookDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    api.get(`libros/${id}/`)
      .then(res => setBook(res.data))
      .catch(console.error);
  }, [id]);

  const handleAddToCart = () => {
    api.post("carrito/", { book: id })
      .then(() => {
        alert("Libro agregado al carrito!");
      })
      .catch(console.error);
  };

  if (!book) return <p className="p-8">Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded shadow p-8">
        {/* Imagen */}
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover mb-6 rounded"
        />
        {/* Detalles */}
        <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-2">Autor: {book.author}</p>
        <p className="text-gray-600 mb-2">ISBN: {book.isbn}</p>
        <p className="text-gray-800 mb-4">{book.description}</p>
        <p className="text-green-600 font-bold text-xl mb-6">${book.price}</p>
        {/* Botón de Agregar al Carrito */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
