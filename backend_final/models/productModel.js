const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the product schema
const productSchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, required: true },
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    product_image: { type: String, required: true },
    ratings: { type: Number, required: true },
    price: { type: Number, required: true },
    category_id: { type: String, required: true },
    subcategory_id: { type: String, required: true },
    keywords: { type: String, required: true },
    quantity: { type: String, required: true },
    brand_id: { type: String, required: true },
    origin: { type: String, required: true }
}, { versionKey: false });

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
