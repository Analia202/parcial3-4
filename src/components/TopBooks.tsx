import { useEffect, useState } from "react";
import api from "../api/api";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string;
}

export default function TopBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api.get<Book[]>("books/top/")
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Error fetching top books:", error);
      });
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">🏆 Top 10 Libros Más Vendidos</h1>
      <div className="grid grid-cols-2 gap-4">
        {books.map((book, index) => (
          <div key={book.id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
            <span className="text-xl font-bold text-gray-700 mb-2">#{index + 1}</span>
            <img src={book.image} alt={book.title} className="h-32 object-cover mb-2" />
            <h2 className="font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-sm text-green-600 font-bold">${book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
