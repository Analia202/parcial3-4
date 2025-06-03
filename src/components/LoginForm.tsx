import axios from "axios";
import { useState } from "react";

export default function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post(
      "/api/login/",
      { username, password },
      { withCredentials: true }
    )
    .then(response => {
      setMessage("¡Login exitoso!");
      onLogin();
    })
    .catch(error => {
      console.error("Error de login", error);
      setMessage("Usuario o contraseña incorrectos.");
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Usuario"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit">Iniciar Sesión</button>
      {message && <p>{message}</p>}
    </form>
  );
}
