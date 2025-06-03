import { useState } from "react";
import { loginUser } from "../api/api";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      console.log("Login Success", response);
      alert("¡Bienvenido!");
    } catch (error) {
      console.error("Login failed", error);
      alert("Error de login");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;
