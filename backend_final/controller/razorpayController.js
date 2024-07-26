const Razorpay = require('razorpay');
require('dotenv').config();
const generateId = require('../utility/common');
const Payment = require('../models/paymentModel');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


exports.createOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const options = {
            amount: amount * 100,
            currency: currency || 'INR',
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order, key: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Order creation failed', error: err.message });
    }
};

exports.savePayment = async (req, res) => {
    try {
        const paymentUdid = await generateId('PAY');
        const { order_id, payment_id, payment_status, record_status, amount, currency } = req.body;
        const newPayment = new Payment({
            udid: paymentUdid,
            order_id: order_id,
            payment_id: payment_id,
            payment_status: payment_status,
            amount: amount,
            currency: currency,
            record_status: record_status
        });
        const savedPayment = await newPayment.save();
        res.status(200).json({ success: true, message: 'Payment saved successfully', data: savedPayment });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to save payment', error: err.message });
    }
};

