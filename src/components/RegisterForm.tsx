import { useState } from "react";
import api from "../api/api";

interface RegisterFormProps {
  onRegister: () => void;
}

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await api.post('register/', { username, password, email });

      if (response.status === 201) {
        setMessage("¡Registro exitoso!");
        onRegister();
      }
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        if (error.response.status === 400) {
          setError("Error en el registro: datos inválidos.");
        } else if (error.response.status === 500) {
          setError("Error interno del servidor.");
        } else {
          setError("Error desconocido. Intenta más tarde.");
        }
      } else {
        setError("No se pudo conectar con el servidor.");
      }
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📝 Registrarse</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Crear Cuenta
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 font-semibold">{message}</p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
}
