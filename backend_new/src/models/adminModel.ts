import mongoose, { Document, Schema } from 'mongoose';

interface Admin extends Document {
    udid: string;
    created_by: string;
    updated_by: string;
    created_date: Date;
    updated_date: Date;
    record_status: string;
    email: string;
    username: string;
    password: string;
    mobile: string;
}

const adminSchema: Schema<Admin> = new Schema({
    udid: {
        type: String,
        required: true,
        unique: true
    },
    created_by: {
        type: String,
        default: null
    },
    updated_by: {
        type: String,
        default: null
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    record_status: {
        type: String,
        default: 'ACTIVE'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }
},{ versionKey: false });

// Create and export the Admin model
const Admin = mongoose.model<Admin>('Admin', adminSchema);

export default Admin;
