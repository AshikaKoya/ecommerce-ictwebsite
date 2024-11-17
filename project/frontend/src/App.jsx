import React from 'react';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';
import AdminProductList from './components/AdminProductList';
import AdminPage from './components/AdminPage';
import Shop from './components/Shop';
import AddProduct from './components/AddProduct';
import AdminUserList from './components/AdminUserList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';




function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/productlist" element={<AdminProductList />} />      
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/use" element={<AdminUserList />} />
      </Routes>
    </div>
  );
}

export default App;
