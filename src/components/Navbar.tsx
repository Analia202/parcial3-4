import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <div className="flex items-center gap-6">
        <Link to="/" className="font-bold text-lg">📚 Librería</Link>
        {token && (
          <>
            <Link to="/orders">Mis Compras</Link>
            <Link to="/cart">Carrito ({cart.length})</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {token ? (
          <>
            <span>👤 {user?.username}</span>
            <button 
              onClick={logout} 
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">Login</Link>
            <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
