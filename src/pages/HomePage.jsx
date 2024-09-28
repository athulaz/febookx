import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="p-0" style={{ backgroundColor: 'black' }}>
      <Header /> {/* Include Header */}

      {/* Main Section */}
      <div className="d-flex justify-content-center align-items-center p-3" style={{ backgroundColor: 'black' }}>
        <div className="row p-3 w-100" style={{ height: '70vh' }}>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center text-center">
            <h1 className="text-white mb-3">
              <span><i className="fa-solid fa-book-open-reader fa me-3"></i> <span className='fs-4'>BookX </span></span>
            </h1>
            <p className="text-light mt-2 px-3">
              BookX is an online platform where users can showcase their book collections. It features a user-friendly interface that allows users to add books with details like title, author, genre, description, and upload book covers. Users can browse and search for books based on various criteria, and they can also view books uploaded by others.
            </p>
            <Link to={'/books'}>
              <Button variant='primary' className='my-3 w-50'>Let's Start</Button>
            </Link>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-center">
            <img className="mt-5" style={{ height: '30vh' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfhcTanjPjIG2H4eyOd_N7tZdOYCxUyOvtBe91-Q8eJ9uuhXguM08alHI0aKnVVyrIqdE&usqp=CAU" alt="project image" />
          </div>
        </div>

        
      </div>

      <div className=" container ">
          <div className=" row  ">
            <div className="col-md-4 col-sm-12 my-3  ">
              <div className="card card-block px-3 py-4  bg-dark text-center">
                <img className="w-100" style={{ height: '40vh' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW1hyuaLBQtBWlUuC8hQZEXvzFnfM8WobjVtUu021moRFrGoz40iRVfrmJJNk98mxl_ow&usqp=CAU" alt="project image" />

                <h4 className="card-title mt-3 mb-3 text-light ">BUY</h4>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis.</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 my-3  ">
              <div className="card card-block px-3 py-4  bg-dark text-center">
                <img className="w-100" style={{ height: '40vh' }} src="https://www.bookdeal.com/blog/wp-content/uploads/2022/12/sell-books-sell-textbooks-online.jpg" alt="project image" />

                <h4 className="card-title mt-3 mb-3 text-light ">SELL</h4>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis.</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 my-3  ">
              <div className="card card-block px-3 py-4  bg-dark text-center">
                <img className="w-100" style={{ height: '40vh' }} src="https://images-cdn.ubuy.co.in/655c8c29773e876409607680-best-seller-colleen-hoover-18-books.jpg" alt="project image" />

                <h4 className="card-title mt-3 mb-3 text-light ">Favorite</h4>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis.</p>
              </div>
            </div>
          </div>   
          
         </div>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default HomePage;
