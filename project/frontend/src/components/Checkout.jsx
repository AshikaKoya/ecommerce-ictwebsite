import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, TextField, Card, CardContent } from '@mui/material';
import './Checkout.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartFromStorage);

    const initialQuantity = {};
    cartFromStorage.forEach(product => {
      initialQuantity[product._id] = 1;
    });
    setQuantity(initialQuantity);

    const calculateTotal = () => {
      const total = cartFromStorage.reduce((acc, product) => {
        return acc + product.price * (initialQuantity[product._id] || 1);
      }, 0);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [navigate]);

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [productId]: newQuantity
    }));
    const updatedCart = cart.map(product => {
      if (product._id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleProceedToPurchase = () => {
    alert('Purchase successful!');
    localStorage.removeItem('cart');
    navigate('/shop');
  };

  return (
    <div className="checkout-container">
      <Typography variant="h4">Checkout</Typography>
      
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty. Add products to your cart first.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id} className="product-card">
              <Card>
                <CardContent>
                  <Typography className="product-name">{product.name}</Typography>
                  <Typography className="product-price">${product.price}</Typography>
                  
                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantity[product._id] || 1}
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    size="small"
                    className="quantity-input"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Typography className="total-price">Total: ${totalPrice}</Typography>

      <Button
        variant="contained"
        onClick={handleProceedToPurchase}
        className="proceed-button"
      >
        Proceed to Purchase
      </Button>
    </div>
  );
};

export default Checkout;
