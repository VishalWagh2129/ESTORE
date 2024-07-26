const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, required: true },
    brand_name: { type: String, required: true },
    description: { type: String, required: true }
}, { versionKey: false });

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
