import { useEffect, useState } from "react";
import api from "../api/api";
import BooksList from "./BooksList";

interface Genre {
  id: number;
  name: string;
}

export default function GenresList() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    api.get<Genre[]>("genres/")
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => {
        console.error("Error fetching genres:", error);
      });
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Géneros 📚</h1>
      <ul className="grid grid-cols-2 gap-4 mb-6">
        {genres.map((genre) => (
          <li
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`cursor-pointer p-4 rounded-lg shadow transition ${
              selectedGenre === genre.id ? "bg-blue-400 text-white" : "bg-blue-100 hover:bg-blue-200"
            }`}
          >
            {genre.name}
          </li>
        ))}
      </ul>

      {selectedGenre && (
        <BooksList genreId={selectedGenre} />
      )}
    </div>
  );
}

