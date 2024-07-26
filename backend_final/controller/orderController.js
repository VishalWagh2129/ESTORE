const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateId = require('../utility/common');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

exports.addOrder = async (req, res) => {
    try {
        const { userName, userEmail, address, city, state, pin, total, orderDetails } = req.body;
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(401).send({ message: `User doesn't exist.` });
        }
        const newOrder = new Order({
            user_id: user.udid,
            username:userName,
            address,
            city,
            state,
            pin,
            total,
            orderDetails,
        });
        const savedOrder = await newOrder.save();
        res.status(201).send({ message: 'Order added successfully', order: savedOrder });
    } catch (error) {
        res.status(400).send({
            error: error.message,
        });
    }
};

exports.allorders = async (req, res) => {
    try {
        const userEmail = req.query.userEmail;

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(401).send({ message: `User doesn't exist.` });
        }

        const orders = await Order.find({ userId: user._id });

        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send({
            error: error.message,
        });
    }
};

exports.orderproducts = async (req, res) => {
    try {
        const orderId = req.query.orderId;
        const order = await Order.findById(orderId).populate('orderDetails.productId', 'product_name product_img');
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        res.status(200).send(order.orderDetails);
    } catch (error) {
        res.status(400).send({
            error: error.message,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email');
        res.status(200).json({ success: true, message: 'All Orders Fetched', data: orders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};