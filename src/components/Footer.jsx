import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-4">
      <p>© {new Date().getFullYear()} BookX. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
