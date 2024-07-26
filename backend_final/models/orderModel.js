const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderDetailSchema = new Schema({
    product_id: { type: String, ref: 'Product', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true }
}, { versionKey: false });

const orderSchema = new Schema({
    user_id: { type: String, ref: 'User', required: true },
    username: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: String, required: true },
    total: { type: Number, required: true },
    orderDetails: [orderDetailSchema],
    orderDate: { type: Date, default: Date.now }
}, { versionKey: false });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
