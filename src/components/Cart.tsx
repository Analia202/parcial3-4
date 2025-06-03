import { useEffect, useState } from "react";
import api from "../api/api";
import { ChangeEvent, useRef } from "react";
import CheckoutForm from "./CheckoutForm";

interface CartItem {
  id: number;
  book: {
    id: number;
    title: string;
    price: string;
    image: string;
  };
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState("");

  const fetchCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debes iniciar sesión para ver tu carrito.");
      return;
    }

    api.get<CartItem[]>("cart/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching cart:", error);
        setError("Error al obtener el carrito.");
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.book.price), 0);
const [showCheckout, setShowCheckout] = useState(false);

const handleCheckout = () => {
  setShowCheckout(true);
};
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">🛒 Carrito de Compras</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        {cartItems.map(item => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
            <img src={item.book.image} alt={item.book.title} className="h-32 object-cover mb-2" />
            <h2 className="font-bold">{item.book.title}</h2>
            <p className="text-green-600 font-semibold">${item.book.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
      
  <div className="mt-4">
  <button
    onClick={handleCheckout}
    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
  >
    Finalizar Compra
  </button>
</div>
      {showCheckout && (<CheckoutForm total={total} onSuccess={() => {
    setCartItems([]);
    setShowCheckout(false);
  }} />
)}


      {/* Aquí iría el botón para "Finalizar compra" que veremos después */}
    </div>
  );
}
