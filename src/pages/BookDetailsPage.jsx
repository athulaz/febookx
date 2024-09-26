import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById } from '../services/api'; // Add this new API call

const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const navigate = useNavigate(); // Use navigate hook to go back

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

    // Handle go back to homepage
    const handleGoBack = () => {
      navigate('/home'); // Navigate back to the homepage
    };
  return (
    <div className="container">
      <h1>{book.title}</h1>
      <img 
        src={book.imageUrl ? `https://backendbookx.onrender.com${book.imageUrl}` : "placeholder.jpg"} 
        alt={book.title} 
        style={{ width: '300px', height: '400px', objectFit: 'cover' }}
      />
      
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      {/* Go Back to Homepage Button */}
      <button 
        onClick={handleGoBack} 
        className="btn btn-primary mt-3"
      >
        Back
      </button>
    </div>
  );
};

export default BookDetailsPage;
