import { useEffect, useState } from "react";
import api from "../api/api";

interface Order {
  id: number;
  total: string;
  comprobante: string;
  created_at: string;
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debes iniciar sesión para ver tus compras.");
      return;
    }

    api.get<Order[]>("orders/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        setError("Error al obtener las compras.");
      });
  }, []);

  if (error) {
    return <div className="p-5 text-red-500">{error}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">🧾 Mis Compras</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No has realizado ninguna compra todavía.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white shadow rounded-lg p-4">
              <p className="text-lg font-bold">Orden #{order.id}</p>
              <p className="text-gray-600">Fecha: {new Date(order.created_at).toLocaleDateString()}</p>
              <p className="text-green-600 font-semibold">Total: ${order.total}</p>
              <div className="mt-2">
                <p className="text-gray-700">Comprobante:</p>
                <img
                  src={order.comprobante}
                  alt={`Comprobante ${order.id}`}
                  className="h-40 object-contain mt-2 border"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
