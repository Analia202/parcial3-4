// src/pages/AdminUsers.tsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = () => {
    api.get("admin/usuarios/")
      .then(res => setUsers(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Listado de Usuarios</h2>

      {users.length === 0 ? (
        <p>No hay usuarios registrados aún.</p>
      ) : (
        <div className="space-y-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-6 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{user.username}</h3>
                <p className="text-gray-600">Email: {user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

