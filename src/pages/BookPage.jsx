import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchBooks, addBook, deleteBook, editBook } from '../services/api'; // API functions
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookData, setBookData] = useState({ title: '', author: '', genre: '', description: '', image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBookData({ ...bookData, image: e.target.files[0] });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('genre', bookData.genre);
    formData.append('description', bookData.description);
    formData.append('image', bookData.image);

    try {
      const token = localStorage.getItem('token');
      const response = await addBook(formData, token);
      setBooks([...books, response.data]);
      setBookData({ title: '', author: '', genre: '', description: '', image: null });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleEditBook = (book) => {
    setIsEditing(true);
    setCurrentBookId(book._id);
    setBookData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      image: null
    });
    setShowModal(true);
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('genre', bookData.genre);
    formData.append('description', bookData.description);

    if (bookData.image) {
      formData.append('image', bookData.image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await editBook(currentBookId, formData, token);
      setBooks(books.map((book) => (book._id === currentBookId ? response.data : book)));
      setIsEditing(false);
      setBookData({ title: '', author: '', genre: '', description: '', image: null });
      setCurrentBookId(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteBook(id, token);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setBookData({ title: '', author: '', genre: '', description: '', image: null });
    setShowModal(true);
  };

  return (
    <div className="p-0" style={{ backgroundColor: 'black' }}>
      <Header /> {/* Include Header */}
      
      {/* Search Bar */}
      <div className="row mt-5">
        <div className="col-12 col-md-8 offset-md-2 d-flex flex-column flex-md-row align-items-center justify-content-between">
          <input
            type="text"
            placeholder="Search by title, author, or genre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control form-control-lg search-bar mb-3 mb-md-0"
            style={{
              borderRadius: '30px',
              padding: '8px 25px',
              fontSize: '16px',
              flex: 1,
              marginRight: '15px',
            }}
          />
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary"
            style={{ padding: '10px 15px', borderRadius: '50px', backgroundColor: '#333' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Book Button */}
      <div className="text-center m-4">
        <Button onClick={handleOpenModal} className="btn btn-primary">
          Add New Book
        </Button>
      </div>

      {/* Book Cards */}
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {books.map((book) => (
          <Card style={{ width: '18rem', margin: '10px' }} key={book._id}>
            <Link to={`/book/${book._id}`}>
              <Card.Img
                variant="top"
                src={book.imageUrl ? `https://backendbookx.onrender.com${book.imageUrl}` : "holder.js/100px180"}
                alt={book.title}
                className="w-100"
                style={{ height: '250px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            </Link>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Author: {book.author}</Card.Text>
              <Card.Text>Genre: {book.genre}</Card.Text>
              {/* <Card.Text>Desc: {book.description}</Card.Text> */}
              <button onClick={() => handleEditBook(book)} className="btn btn-dark">
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button onClick={() => handleDeleteBook(book._id)} className="btn btn-dark">
                <i className="fas fa-trash"></i>
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Add/Edit Book Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Book' : 'Add a New Book'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update Book' : 'Add Book'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default BookPage;
