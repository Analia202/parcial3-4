// src/pages/Cart.tsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    api.get("carrito/")
      .then(res => setCartItems(res.data))
      .catch(console.error);
  }, []);

  const handleRemove = (id: number) => {
    api.delete(`carrito/${id}/`)
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== id));
        alert("Libro eliminado del carrito");
      })
      .catch(console.error);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Mi Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No tienes libros en el carrito.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 bg-white rounded shadow"
            >
              <div>
                <h3 className="font-bold">{item.book.title}</h3>
                <p className="text-gray-600">Autor: {item.book.author}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
