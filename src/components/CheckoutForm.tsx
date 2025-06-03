import { useState } from "react";
import api from "../api/api";

interface CheckoutFormProps {
  total: number;
  onSuccess: () => void;
}

export default function CheckoutForm({ total, onSuccess }: CheckoutFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage("Debes subir un comprobante.");
      return;
    }

    const formData = new FormData();
    formData.append("comprobante", file);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Debes estar logueado para comprar.");
      return;
    }

    api.post("orders/", formData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        setMessage("Compra realizada exitosamente ✅");
        onSuccess();
      })
      .catch(error => {
        console.error("Error confirming purchase:", error);
        setMessage("Error al confirmar la compra.");
      });
  };

  return (
    <div className="p-5 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Finalizar Compra</h2>
      <p className="mb-4 text-lg">Total a pagar: <span className="font-bold">${total.toFixed(2)}</span></p>

      <div className="mb-4">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Pago1234" alt="QR de Pago" />
      </div>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} className="mb-4" accept="image/*" />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Confirmar Compra
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 font-semibold">{message}</p>
      )}
    </div>
  );
}
