import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import User from './models/User.js'; // Import the User model
import authRoutes from './routes/auth.js';
import productRoutes from './routes/productRoutes.js';


// Load environment variables
dotenv.config();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    createDefaultAdmin(); // Call the function to create an admin on startup
  })
  .catch(err => console.error(err));

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/productRoutes', productRoutes); // Ensure route name matches `/api/products`

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Function to create a default admin user
async function createDefaultAdmin() {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            const admin = new User({
                username: 'admin',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('Default admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating default admin user:', error.message);
    }
}
 
