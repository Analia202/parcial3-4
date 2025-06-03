import { useEffect, useState } from "react";
import api from "../api/api";
import BookDetail from "./BookDetail";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  description: string;
  image: string;
}

interface BooksListProps {
  genreId: number;
}

export default function BooksList({ genreId }: BooksListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    if (genreId) {
      api.get<Book[]>(`books/?genre=${genreId}`)
        .then(response => {
          setBooks(response.data);
        })
        .catch(error => {
          console.error("Error fetching books:", error);
        });
    }
  }, [genreId]);

  if (selectedBookId) {
    return <BookDetail bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />;
  }

  if (books.length === 0) {
    return <div className="p-5 text-center text-gray-500">No hay libros en este género.</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Libros 📚</h2>
      <div className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => setSelectedBookId(book.id)}
            className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <img src={book.image} alt={book.title} className="h-40 object-cover w-full rounded-md mb-2" />
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-sm text-green-600 font-bold">${book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
