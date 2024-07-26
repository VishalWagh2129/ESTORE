import { Schema, model, Document } from 'mongoose';

interface Payment extends Document {
  udid: string;
  created_by: string;
  updated_by: string;
  created_date: Date;
  updated_date: Date;
  record_status: string;
  order_id: string;
  payment_id: string;
  payment_status: string;
  amount: number;
  currency: string;
}

const paymentSchema = new Schema<Payment>({
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

const Payment = model<Payment>('Payment', paymentSchema);

export default Payment;
