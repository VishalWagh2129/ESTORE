const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('error',()=>{
    console.log('Error Connecting Database');
});

connection.on('connected',()=>{
    console.log('Connected to Mongodb database');
})

module.exports = connection;