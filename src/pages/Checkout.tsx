import { useState } from "react";

import { uploadReceipt } from "../api/api";
import QRCode from 'react-qrcode-logo';

function Checkout({ orderId }: { orderId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Por favor selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append('receipt', file);

    try {
      await uploadReceipt(orderId, formData);
      setMessage("Comprobante subido exitosamente.");
    } catch (error) {
      console.error(error);
      setMessage("Error al subir comprobante.");
    }
  };

  return (
    <div className="p-8">
      <h2>Checkout</h2>
      <QRCode value={`https://pago-fake.com/orden/${orderId}`} size={256} />
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="btn btn-primary mt-4">Subir Comprobante</button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default Checkout;
