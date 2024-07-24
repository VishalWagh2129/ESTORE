const express = require('express');
const pool = require('../shared/pool');
const pay = express.Router();
const genrateId = require('../utility/common');
const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

pay.post('/create-order', (req, res) => {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100,
      currency: currency || 'INR',
    };
    razorpay.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Order creation failed', error: err.message });
      }
      res.status(200).json({ success: true, order, key: razorpay.key_id });
    });
  });


  pay.post('/save-payment', async(req, res) => {
    const paymentUdid = await genrateId('PAY');
    const { ORDER_ID,CREATED_BY,UPDATED_BY, PAYMENT_ID, PAYMENT_STATUS, AMOUNT, CURRENCY } = req.body;
    const query = `INSERT INTO payments (UDID,CREATED_BY,UPDATED_BY,CREATED_DATE,UPDATED_DATE,RECORD_STATUS,ORDER_ID, PAYMENT_ID, PAYMENT_STATUS, AMOUNT, CURRENCY) VALUES (?, ?, ?,NOW(),NOW(),'ACTIVE', ?, ?, ?, ?, ?)`;
    pool.query(query, [paymentUdid,CREATED_BY,UPDATED_BY,ORDER_ID, PAYMENT_ID, PAYMENT_STATUS, AMOUNT, CURRENCY], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to save payment', error: err.message });
      }
      res.status(200).json({ success: true, message: 'Payment saved successfully', data: result });
    });
  });

  module.exports = pay;
  