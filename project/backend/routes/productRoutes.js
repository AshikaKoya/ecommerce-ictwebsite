import express from 'express';
import Product from '../models/Product.js';
import { authenticateToken } from '../routes/auth.js'; // Make sure the user is authenticated

const router = express.Router();

// Add product route (for admin only)
router.post('/products', authenticateToken, async (req, res) => {
    
    console.log("Request headers:", req.headers);
  
    try {
    const { name, price, category } = req.body;
    console.log("Request body:", req.body);

    // Check if the logged-in user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to add a product' });
    }

    const newProduct = new Product({
      name,
      price,
      category,
      createdBy: req.user.userId, // Associate the product with the user who created it
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error in /products POST route:', error);
    res.status(500).json({ message: 'Error while adding the product' });
  }
});


// Delete product by ID (admin only)
router.delete('/:productId', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to delete products.' });
    }
  
    try {
      const { productId } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  });

  // Update product route (for admin only)
router.put('/:productId', authenticateToken, async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, price, category } = req.body;
  
      // Check if the logged-in user is an admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to update a product' });
      }
  
      // Find and update the product
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, price, category },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while updating the product' });
    }
  });
  
  
  // Route to get all products (accessible to both admin and users, no login required)
router.get('/list', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: 'Error while fetching products' });
    }
  });  

export default router;
