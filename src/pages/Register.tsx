import { useState } from "react";
import { registerUser } from "../api/api";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      console.log(response);
      alert("¡Registro exitoso!");
    } catch (error) {
      console.error(error);
      alert("Error al registrar");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Usuario" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Contraseña" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
