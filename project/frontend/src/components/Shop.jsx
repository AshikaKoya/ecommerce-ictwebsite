import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Access location to get the query params

  // Fetch products and check login status
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productRoutes/list');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, show all products

        // Check if there's a search query in the URL and filter products accordingly
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search')?.toLowerCase();

        if (searchQuery) {
          // Filter products based on the search query, making sure `name` and `description` are strings
          const filtered = data.filter((product) =>
            (product.name && product.name.toLowerCase().includes(searchQuery)) ||
            (product.description && product.description.toLowerCase().includes(searchQuery))
          );
          setFilteredProducts(filtered); // Set filtered products
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Check if the user is logged in by checking the token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [location.search]); // Rerun when location changes (i.e., when the search query changes)

  const handleBuyNowClick = (productId) => {
    if (!isLoggedIn) {
      // If not logged in, redirect to login page
      navigate('/login');
    } else {
      const product = products.find(p => p._id === productId);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const productInCart = cart.find(item => item._id === productId);

      if (!productInCart) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      navigate('/checkout');
    }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      // If not logged in, redirect to login page
      navigate('/login');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    navigate('/cart');
  };

  return (
    <div className="shop-container">
      {loading ? (
        <Typography variant="h6">Loading products...</Typography>
      ) : error ? (
        <Typography variant="h6" color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="h6">${product.price}</Typography>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleBuyNowClick(product._id)}
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Shop;
