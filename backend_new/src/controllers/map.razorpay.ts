import express, { Request, Response } from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import { generateId } from '../shared/common'; // Make sure to import your generateId function
import Payment from '../models/paymentModel'; // Import the Payment model

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export const createOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const options = {
            amount: amount * 100,
            currency: currency || 'INR',
        };
        const order:any = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order, key: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Order creation failed', error: err.message });
    }
};

export const savePayment = async (req, res) => {
    try {
        const paymentUdid = await generateId('PAY');
        const { order_id, payment_id, payment_status,record_status, amount, currency } = req.body;
        const newPayment = new Payment({
            udid: paymentUdid,
            order_id: order_id,
            payment_id: payment_id,
            payment_status: payment_status,
            amount: amount,
            currency: currency,
            record_status:record_status
        });
        const savedPayment = await newPayment.save();
        res.status(200).json({ success: true, message: 'Payment saved successfully', data: savedPayment });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to save payment', error: err.message });
    }
};
