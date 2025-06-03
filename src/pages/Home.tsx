// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Home() {
  const [genres, setGenres] = useState<any[]>([]);
  const [topBooks, setTopBooks] = useState<any[]>([]);

  useEffect(() => {
    // Llamada para géneros
    api.get("generos")
      .then(res => setGenres(res.data))
      .catch(console.error);

    // Llamada para top 10 libros
    api.get("libros/top")
      .then(res => setTopBooks(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-8 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Géneros</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <div key={genre.id} className="p-4 bg-white border rounded shadow hover:shadow-lg">
              <h3 className="font-bold text-lg">{genre.name}</h3>
              {/* Aquí podrías poner un link a los libros de ese género */}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Top 10 Libros Más Vendidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topBooks.map((book) => (
            <Link to={`/libros/${book.id}`} key={book.id}>
              <div className="p-4 bg-white border rounded shadow hover:shadow-lg">
                <h3 className="font-bold text-lg">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-green-600 font-bold">${book.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
