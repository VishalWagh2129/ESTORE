const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, required: true },
    category_name: { type: String, required: true }
}, { versionKey: false });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
