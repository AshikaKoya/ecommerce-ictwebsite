import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data.role);

        // Save the JWT token and role in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        // Redirect based on role
        if (data.role === 'admin') {
          navigate('/admin'); // Admin panel
        } else {
          navigate('/home'); // Regular user home page
        }
      } else {
        setError(data.message || 'Invalid username or password'); // Display error message if login fails
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
      sx={{ backgroundColor: '#f4f4f4' }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '10px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Login to GeeZerOne
          </Typography>

          {error && <Typography color="error" variant="body2">{error}</Typography>}

          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ marginBottom: 2, backgroundColor: 'white' }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 2, backgroundColor: 'white' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>

          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Not a member?{' '}
              <Link 
                href="/register" 
                sx={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
