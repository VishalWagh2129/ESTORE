const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the subcategory schema
const subCategorySchema = new Schema({
    udid: { type: String, required: true, unique: true },
    category_id: { type: String, required: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, required: true },
    subcategory_name: { type: String, required: true }
}, { versionKey: false });

// Create and export the SubCategory model
const SubCategory = model('SubCategory', subCategorySchema);

module.exports = SubCategory;
