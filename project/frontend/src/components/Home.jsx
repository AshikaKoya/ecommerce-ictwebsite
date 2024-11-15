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
            <img src="https://via.placeholder.com/100" alt="Product 1" />
            <p>Product 1</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/100" alt="Product 2" />
            <p>Product 2</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/100" alt="Product 3" />
            <p>Product 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
