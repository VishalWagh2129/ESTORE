const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the schema for the User model
const userSchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, default: null },
    updated_by: { type: String, default: null },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, default: 'active' },
    state: { type: String, required: true },
    pin: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true }
}, { versionKey: false });

// Create and export the User model
const User = model('User', userSchema);

module.exports = User;
