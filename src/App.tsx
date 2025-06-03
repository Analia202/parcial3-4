import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import GenreList from './components/GenresList';
import BookList from './components/BooksList';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import MyOrders from './components/MyOrders';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminBooks from './pages/AdminBooks';
import AdminGenres from './pages/AdminGenres';
import AdminBookGenre from './pages/AdminBookGenre';
import AdminSales from './pages/AdminSales';
import AdminUsers from './pages/AdminUsers';
import { PrivateRoute } from './components/PrivateRoute';

// Wrappers para pasar params
import { useParams } from 'react-router-dom';

const BookListWrapper = () => {
  const { id } = useParams();
  return <BookList genreId={Number(id)} />;
};

const BookDetailWrapper = () => {
  const { id } = useParams();

  const handleBack = () => {
    window.history.back();
  };

  return <BookDetail bookId={Number(id)} onBack={handleBack} />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<GenreList />} />
              <Route path="/genre/:id" element={<BookListWrapper />} />
              <Route path="/book/:id" element={<BookDetailWrapper />} />
              <Route path="/cart" element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              } />
              <Route path="/checkout" element={
                <PrivateRoute>
                  <CheckoutForm total={100} onSuccess={() => alert('Compra exitosa')} />
                </PrivateRoute>
              } />
              <Route path="/orders" element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/admin/books" element={
                <PrivateRoute>
                  <AdminBooks />
                </PrivateRoute>
              } />
              <Route path="/admin/genres" element={
                <PrivateRoute>
                  <AdminGenres />
                </PrivateRoute>
              } />
              <Route path="/admin/book-genre" element={
                <PrivateRoute>
                  <AdminBookGenre />
                </PrivateRoute>
              } />
              <Route path="/admin/sales" element={
                <PrivateRoute>
                  <AdminSales />
                </PrivateRoute>
              } />
              <Route path="/admin/users" element={
                <PrivateRoute>
                  <AdminUsers />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
