import { createContext, useContext, useState, ReactNode } from 'react';

interface Book {
  id: number;
  title: string;
  price: number;
}

interface CartContextType {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    if (!cart.find(item => item.id === book.id)) {
      setCart([...cart, book]);
    }
  };

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter(book => book.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};
