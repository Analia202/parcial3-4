// src/pages/AdminSales.tsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminSales() {
  const [sales, setSales] = useState<any[]>([]);

  const fetchSales = () => {
    api.get("admin/ventas/")
      .then(res => setSales(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Listado de Ventas</h2>

      {sales.length === 0 ? (
        <p>No hay ventas registradas aún.</p>
      ) : (
        <div className="space-y-6">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="p-6 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">Orden #{sale.id}</h3>
                <p className="text-gray-600">Cliente: {sale.user.username}</p>
                <p className="text-gray-600">Fecha: {new Date(sale.created_at).toLocaleDateString()}</p>
              </div>
              <div className="text-green-600 font-bold">
                ${sale.total_price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
