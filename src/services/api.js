import axios from 'axios';

// Base URL for the API
const api = axios.create({
  baseURL: 'https://bookxbe-3.onrender.com', // Change this if your backend runs on a different port
});

// Function to register a new user
export const registerUser = (userData) => api.post('/users/register', userData);

// Function to log in a user
export const loginUser = (userData) => api.post('/users/login', userData);

// Function to fetch books with optional search query
export const fetchBooks = (query = '', token) =>
  api.get(`/books/search?query=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Function to add a new book
// export const addBook = (bookData, token) =>
//   api.post('/books', bookData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });



  export const addBook = (bookData, token) =>
    api.post('/books', bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  
// Function to edit an existing book
export const editBook = (bookId, bookData, token) =>
  api.put(`/books/${bookId}`, bookData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Function to delete a book

export const deleteBook = (bookId, token) =>
  api.delete(`/books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

