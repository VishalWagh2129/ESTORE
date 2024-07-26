import mongoose from 'mongoose';
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL as string;

mongoose.connect(mongoUrl, {
    autoIndex: true // Use autoIndex instead of useCreateIndex
});

const connection = mongoose.connection;

connection.on('error', () => {
    console.error('Error Connecting Database');
});
connection.on('connected', () => {
    console.log('Connected to MongoDB database');
});

export default connection;
