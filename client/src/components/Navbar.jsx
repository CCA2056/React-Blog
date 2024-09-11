import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggles the state between true and false
  };

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>
        <div className="logo">Hi, welcome to my blog!</div>

        {/* Regular Links for desktop */}
        <div className="links">
          <Link className='link' to="/home?cat=aviation"><h6>Aviation Photos</h6></Link>
          <Link className='link' to="/home?cat=cars"><h6>Cars Photos</h6></Link>
          <Link className='link' to="/home?cat=models"><h6>Models</h6></Link>
          <Link className='link' to="/home?cat=car-reviews"><h6>Car Reviews</h6></Link>
          <Link className='link' to="/home?cat=technology"><h6>Technology</h6></Link>
          <Link className='link' to="/home?cat=photography"><h6>Other Photos</h6></Link>
        </div>

        <div className='right'>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">Login</Link>
          )}
          <span className='write'>
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776; {/* Unicode for hamburger icon */}
        </div>

        {/* Mobile menu - Visible based on menuOpen state */}
        <div className={`menu-links ${menuOpen ? 'menu-active' : ''}`}>
          <Link className='link' to="/home?cat=aviation"><h6>Aviation Photos</h6></Link>
          <Link className='link' to="/home?cat=cars"><h6>Cars Photos</h6></Link>
          <Link className='link' to="/home?cat=models"><h6>Models</h6></Link>
          <Link className='link' to="/home?cat=car-reviews"><h6>Car Reviews</h6></Link>
          <Link className='link' to="/home?cat=technology"><h6>Technology</h6></Link>
          <Link className='link' to="/home?cat=photography"><h6>Other Photos</h6></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
