import React, { useEffect, useState } from 'react';
import './AdminProductList.css';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/productRoutes/list', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.message || 'Failed to load products.');
        }
      } catch {
        setError('Error fetching products.');
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product); // Set the product to be edited
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/productRoutes/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingProduct)
      });
      const updatedProduct = await response.json();

      if (response.ok) {
        // Update product list
        setProducts((prev) =>
          prev.map((product) => product._id === updatedProduct._id ? updatedProduct : product)
        );
        setEditingProduct(null); // Clear the editing state
      } else {
        setError(updatedProduct.message || 'Failed to update product.');
      }
    } catch (err) {
      setError('Error updating product.');
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/productRoutes/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Remove the deleted product from the list
        setProducts((prev) => prev.filter((product) => product._id !== productId));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete product.');
      }
    } catch (err) {
      setError('Error deleting product.');
    }
  };

  return (
    <div className="admin-product-list">
      
      {error && <p className="error">{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div className="edit-product-form">
          <h3>Edit Product</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            />
            <input
              type="text"
              value={editingProduct.category}
              onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
            />
            <button type="submit">Update</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
