import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#fef2f2' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>🏠 Home</Link>
      <Link to="/about" style={{ marginRight: '1rem' }}>❤️ About (Love Chat)</Link>
      <Link to="/gallery">📷 Gallery</Link>
    </nav>
  );
};

export default Navbar;
