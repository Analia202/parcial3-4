import { useEffect, useState } from "react";
import { fetchMyOrders } from "../api/api";

interface Order {
  id: number;
  total_price: number;
  receipt: string | null;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchMyOrders()
      .then(response => setOrders(response.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h2>Mis Compras</h2>
      {orders.map(order => (
        <div key={order.id} className="border p-4 my-4">
          <h3>Orden #{order.id}</h3>
          <p>Total: ${order.total_price}</p>
          {order.receipt && (
            <img src={`http://localhost:8000${order.receipt}`} alt="Comprobante" width="200" />
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
