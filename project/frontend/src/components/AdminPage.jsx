import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as jwt_decode from 'jwt-decode';
  // Correct import for jwt-decode
import "./AdminPage.css";
import AddProduct from "./AddProduct";

const AdminPage = () => {
 

  return (
    <div className="admin-page">
      <h2>Admin Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/addproduct">Add Product</Link>
          </li>
          
          <li>
            <Link to="/admin/productlist"> Product List</Link>
          </li>
          <li>
            <Link to="/admin/use"> View Users</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default AdminPage;
