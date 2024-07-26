import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the User document
interface User extends Document {
    udid: string;
    created_by: string;
    updated_by: string;
    created_date: Date;
    updated_date: Date;
    record_status: string;
    state: string;
    pin: string;
    city: string;
    address: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

// Define the schema for the User model
const userSchema: Schema<User> = new Schema({
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
        default: 'active'
    },
    state: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{ versionKey: false });

// Create and export the User model
const User = mongoose.model<User>('User', userSchema);

export default User;
