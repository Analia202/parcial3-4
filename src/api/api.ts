import axios from "axios";

// Instancia de Axios apuntando al PROXY
const api = axios.create({
  baseURL: "http://localhost:3001/webproxy", // El proxy
  withCredentials: true,
});

// Auth
export const registerUser = (userData: { username: string; password: string; email: string }) => 
  api.post("/auth/users/", userData);

export const loginUser = (loginData: { username: string; password: string }) =>
  api.post("/auth/token/login/", loginData);

// Libros y Géneros
export const fetchGenres = () => api.get("/genres/");
export const fetchBooks = () => api.get("/books/");
export const fetchTopBooks = () => api.get("/top-books/");

// Ordenes y Carrito
export const createOrder = (orderData: { books: number[] }) =>
  api.post("/orders/", orderData);

export const uploadReceipt = (orderId: number, formData: FormData) =>
  api.post(`/orders/${orderId}/upload_receipt/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const fetchMyOrders = () => api.get("/orders/");

// Admin - Libros
export const createBook = (bookData: any) => api.post("/books/", bookData);
export const updateBook = (id: number, bookData: any) => api.put(`/books/${id}/`, bookData);
export const deleteBook = (id: number) => api.delete(`/books/${id}/`);

// Admin - Géneros
export const createGenre = (genreData: any) => api.post("/genres/", genreData);
export const updateGenre = (id: number, genreData: any) => api.put(`/genres/${id}/`, genreData);
export const deleteGenre = (id: number) => api.delete(`/genres/${id}/`);

// Admin - Usuarios y Ventas
export const fetchUsers = () => api.get("/users/");
export const fetchSales = () => api.get("/sales/");

export default api; // ✅ Este es el default para poder usar import api from "api/api"
