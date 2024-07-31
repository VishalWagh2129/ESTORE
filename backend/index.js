const express = require('express');
const app = express();
const productCategories = require('./routes/routes');
const products = require('./routes/products');
const users = require('./routes/users');
const mysql = require('mysql2');
const orders = require('./routes/orders');
const admin = require('./routes/admin');
const logo = require('./routes/logo');
const brand = require('./routes/brand');
const razorpay = require('./routes/razorpay');
const wishlist = require('./routes/wishlist');
const PORT = 3000;
const cors = require('cors');
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

app.use('/api', productCategories);
app.use('/api', products);
app.use('/api', users);
app.use('/api', orders);
app.use('/api', admin);
app.use('/api', logo);
app.use('/api', brand);
app.use('/api', razorpay);
app.use('/api', wishlist);

const server = app.listen(PORT, () => {
  console.log('App is running on the port - 3000');
});
