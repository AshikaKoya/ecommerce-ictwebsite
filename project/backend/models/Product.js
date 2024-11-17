import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
   
    category: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User who created this product
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;