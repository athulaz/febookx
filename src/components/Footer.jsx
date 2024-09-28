import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    
     
      
      <footer className=" text-center text-lg-start fixed-end mt-5 bg-black">
        <div className="container p-4 ">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0 ">
              <h5 className=" mb-0 text-white">Bookx</h5>
              <br />
              <p> BookX is an online platform where users can showcase their book collections. It features a user-friendly interface that allows users to add books with details like title, author, genre, description, and upload book covers. Users can browse and search for books based on various criteria, and they can also view books uploaded by others
              .</p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className=" text-white">Pages</h5>
              <br />
              <ul className="list-unstyled mb-0 ">
                <li>
                  <Link to="/home" className="text-body text-black">Home</Link>
                </li>
                <li>
                  <Link to="/books" className="text-body text-black">Books</Link>
                </li>

                <li>
                  <Link to="" className="text-body text-black">About</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className=" mb-5 text-white">Contact Us</h5>

              <ul className="list-unstyled">
                <li><textarea name="" id="" className='form-control border-0 bg-light text-white' placeholder='Send Message to Us'></textarea></li>
                <li><button className='btn btn-dark rounded-0 w-100 rounded-2 mt-2 border-0'>Send</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <p>© {new Date().getFullYear()} BookX. All Rights Reserved.</p>
        </div>
      </footer>
   


  );
};

export default Footer;
