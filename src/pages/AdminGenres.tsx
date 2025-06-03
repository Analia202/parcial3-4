// src/pages/AdminGenres.tsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminGenres() {
  const [genres, setGenres] = useState<any[]>([]);
  const [name, setName] = useState("");

  const fetchGenres = () => {
    api.get("generos/")
      .then(res => setGenres(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleCreateGenre = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("admin/generos/", { name });
      alert("Género creado con éxito.");
      fetchGenres();
      setName("");
    } catch (error) {
      console.error(error);
      alert("Error al crear género.");
    }
  };

  const handleDeleteGenre = async (id: number) => {
    try {
      await api.delete(`admin/generos/${id}/`);
      alert("Género eliminado.");
      fetchGenres();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar género.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Administrar Géneros</h2>

      {/* Formulario Crear Género */}
      <form onSubmit={handleCreateGenre} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nombre del Género"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          Crear Género
        </button>
      </form>

      {/* Lista de Géneros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {genres.map((genre) => (
          <div key={genre.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{genre.name}</h3>
            </div>
            <button
              onClick={() => handleDeleteGenre(genre.id)}
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
