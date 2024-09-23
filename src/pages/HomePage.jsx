import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, addBook, deleteBook, editBook } from '../services/api'; // API functions
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from 'react-bootstrap/Card';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookData, setBookData] = useState({ title: '', author: '', genre: '', description: '', image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const navigate = useNavigate();

  // Fetch books on page load
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetchBooks(searchQuery, token);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchAllBooks();
  }, [searchQuery]);

  // Handle input change for book form
  const handleInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setBookData({ ...bookData, image: e.target.files[0] });
  };

  // Add a new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('genre', bookData.genre);
    formData.append('description', bookData.description);
    formData.append('image', bookData.image); // Include the image
  
    try {
      const token = localStorage.getItem('token');
      const response = await addBook(formData, token); // Pass formData instead of bookData
      setBooks([...books, response.data]);
      setBookData({ title: '', author: '', genre: '', description: '', image: null }); // Reset form
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Edit an existing book
  const handleEditBook = (book) => {
    setIsEditing(true);
    setCurrentBookId(book._id);
    setBookData({ 
      title: book.title, 
      author: book.author, 
      genre: book.genre, 
      description: book.description, 
      image: null // Ensure the image field is reset when editing
    });
  };

  // Update the book after editing
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('genre', bookData.genre);
    formData.append('description', bookData.description);
    
    // Only append the image if a new one is uploaded
    if (bookData.image) {
      formData.append('image', bookData.image); 
    }

    try {
      const token = localStorage.getItem('token');
      const response = await editBook(currentBookId, formData, token);
      setBooks(books.map((book) => (book._id === currentBookId ? response.data : book)));
      setIsEditing(false);
      setBookData({ title: '', author: '', genre: '', description: '', image: null }); // Reset form after edit
      setCurrentBookId(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Delete a book
  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteBook(id, token);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <Header /> {/* Include Header */}
      <div className="d-flex justify-content-between align-items-center p-3">
        <div className="ms-auto">
          <button onClick={handleLogout} className="btn btn-warning">Logout</button>
        </div>
      </div>

      <div className="container">
        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-md-8 offset-md-2">
            <input
              type="text"
              placeholder="Search by title, author, or genre"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control form-control-lg"
              style={{ borderRadius: '30px', padding: '10px 20px' }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card shadow-sm p-4">
              <h4 className="text-center mb-4">{isEditing ? 'Edit Book' : 'Add a New Book'}</h4>
              <form onSubmit={isEditing ? handleUpdateBook : handleAddBook}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Book Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter book title"
                    value={bookData.title}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author</label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Enter author name"
                    value={bookData.author}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">Genre</label>
                  <input
                    type="text"
                    name="genre"
                    id="genre"
                    placeholder="Enter genre"
                    value={bookData.genre}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Enter book description"
                    value={bookData.description}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="4"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Book Cover Image</label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {isEditing ? 'Update Book' : 'Add Book'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Book Cards */}
      <div className="d-flex flex-row flex-wrap">
        {books.map((book) => (
          <Card style={{ width: '18rem', margin: '10px' }} key={book._id}>
            <Card.Img
              variant="top"
              src={book.imageUrl ? `https://bookxbe-3.onrender.com${book.imageUrl}` : "holder.js/100px180"}
              alt={book.title}
              className="w-100"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Author: {book.author}</Card.Text>
              <Card.Text>Genre: {book.genre}</Card.Text>
              <Card.Text>Desc: {book.description}</Card.Text>
              <button onClick={() => handleEditBook(book)} className="btn btn-secondary me-2">Edit</button>
              <button onClick={() => handleDeleteBook(book._id)} className="btn btn-danger">Delete</button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default HomePage;
