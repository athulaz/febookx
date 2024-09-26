import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, addBook, deleteBook, editBook } from '../services/api'; // API functions
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap Modal
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookData, setBookData] = useState({ title: '', author: '', genre: '', description: '', image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state
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
      setShowModal(false); // Close the modal after adding the book
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
    setShowModal(true); // Open the modal for editing
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
      setShowModal(false); // Close the modal after updating the book
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

  // Open modal for adding a book
  const handleOpenModal = () => {
    setIsEditing(false);
    setBookData({ title: '', author: '', genre: '', description: '', image: null }); // Reset the form for adding a new book
    setShowModal(true);
  };

  return (
    <div className="container-fluid p-0">
      <Header /> {/* Include Header */}

      {/* Main Section */}
      <div className="d-flex justify-content-center align-items-center p-3" style={{ backgroundColor: 'black' }}>
        <div className="row p-3 w-100" style={{ height: '100vh' }}>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center text-center">
            <h1 className="text-white mb-3">
              <i className="fa-solid fa-book-open-reader fa-xl"></i>{' '}
              BookX
            </h1>
            <p className="text-light mt-2 px-3" style={{ textAlign: 'justify' }}>
            BookX is an online platform where users can showcase their book collections. It features a user-friendly interface that allows users to add books with details like title, author, genre, description, and upload book covers. Users can browse and search for books based on various criteria, and they can also view books uploaded by others
            </p>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-center">
            <img className="img-fluid rounded" src="https://www.elegantthemes.com/blog/wp-content/uploads/2021/03/essential-web-design-books-featured-image.jpg" alt="project image" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
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
              marginRight: '15px'
            }}
          />
          <button
            onClick={handleLogout}
            className="btn btn-primary"
            style={{
              padding: '10px 15px',
              borderRadius: '50px',
              backgroundColor: '#333',
         
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Book Button */}
      <div className="text-center mb-4">
        <Button onClick={handleOpenModal} className="btn btn-primary ">
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
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </Link>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Author: {book.author}</Card.Text>
              <Card.Text>Genre: {book.genre}</Card.Text>
              <Card.Text>Desc: {book.description}</Card.Text>
              <button onClick={() => handleEditBook(book)} className="btn btn-secondary me-2">  <i className="fas fa-pencil-alt"></i></button>
              <button onClick={() => handleDeleteBook(book._id)} className="btn btn-danger">  <i className="fas fa-trash"></i></button>
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
              <button type="submit" className="btn btn-primary">{isEditing ? 'Update Book' : 'Add Book'}</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default HomePage;
