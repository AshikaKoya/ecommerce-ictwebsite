// src/components/Cart.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import './Cart.css'; // Add your styling for the Cart component

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Get the cart data from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    // Filter out the product from the cart
    const updatedCart = cart.filter(item => item._id !== productId);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update the state
    setCart(updatedCart);
  };

  return (
    <div className="cart-container">
      <Typography variant="h4">"Bringing Your Wishlist Closer!"</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty. Add some products!</Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((product) => (
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
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(product._id)}
                  >
                    Remove from Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Button variant="contained" color="primary" component={Link} to="/checkout">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Cart;
