const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, default: null },
    updated_by: { type: String, default: null },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, default: 'ACTIVE' },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true }
}, { versionKey: false });

// Create and export the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
