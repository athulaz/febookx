import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../services/api'; // Add this new API call

const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchBookById(id, token); // Fetch book details by ID
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>{book.title}</h1>
      <img 
        src={book.imageUrl ? `https://bookxbe-3.onrender.com${book.imageUrl}` : "placeholder.jpg"} 
        alt={book.title} 
        style={{ width: '300px', height: '400px', objectFit: 'cover' }}
      />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
};

export default BookDetailsPage;
