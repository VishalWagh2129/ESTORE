const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, default: 'ACTIVE' },
    order_id: { type: String, required: true },
    payment_id: { type: String, required: true },
    payment_status: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
}, { versionKey: false });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
