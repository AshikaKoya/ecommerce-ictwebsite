import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { IconButton, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from '@mui/icons-material/Logout'; // Import the logout icon
import './Navbar.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from "react"; // Import useState to manage the search input

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  // Handle logout by removing token and redirecting
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to login page
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query on input change
  };

  // Handle search button click (you can link it to your search page or filter logic)
  const handleSearchSubmit = (event) => {
    event.preventDefault();  // Prevent page reload on submit
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`); // Navigate to the search results page with the query
    }
  };

  return (
    <>
      {/* Primary Navbar */}
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <Link to="/home" className="website-name">GeeZerOne</Link>
        </div>

        {/* Search and Cart icon container */}
        <div className="search-cart-container">
          <form onSubmit={handleSearchSubmit}>  {/* Wrap search input in a form */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery} // Bind the input value to the searchQuery state
                onChange={handleSearchChange} // Handle input change
              />
              <button type="submit" className="search-button">🔍</button> {/* Search button */}
            </div>
          </form>

          {/* Cart icon */}
          <IconButton className="cart-icon" sx={{ color: 'white' }} component={Link} to="/cart">
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="secondary-navbar">
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        {/* Login or Logout Button */}
        {localStorage.getItem('token') ? (
          <IconButton className="logout-icon" sx={{ color: 'white' }} onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        ) : (
          <Link to="/login">
            <Button className="login-button" variant="outlined" color="primary">Login</Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
