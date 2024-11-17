import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="intro-section">
        <h1 className="heading fade-in">Get Trendy With</h1>
        <h1 className="heading2 slide-up">GeeZerOne</h1>
        <p className="description fade-in-delay">
          Explore a wide range of products and start shopping today!
        </p>
        <Link to="/shop" className="shop-button">Buy 1 Get 1 Free On first Order</Link>
      </div>

      {/* Featured Products Section */}
      <div className="featured-section">
        <h2 className="featured-title">Featured Products</h2>
        <div className="featured-products">
          <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaxWst1NRsBABDjp6X-_8pSIH-u6uynbxiew&s" alt="Product 1" />
            
          </div>
          <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHwl0rFHJozEtZdfIMo9A0R33qRTskeiq9hg&s" alt="Product 2" />
           
          </div>
          <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcX_evte02ByUWZ06JrVK6AlrMBkEhyb9UJw&s" alt="Product 3" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
