import { Schema, model, Document, Types } from 'mongoose';

interface OrderDetail extends Document {
  product_id: string;
  qty: number;
  price: number;
  amount: number;
}

interface Order extends Document {
  user_id: string;
  username: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  total: number;
  orderDetails: OrderDetail[];
  orderDate: Date;
}

const orderDetailSchema = new Schema<OrderDetail>({
  product_id: { type: String, ref: 'Product', required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
},{ versionKey: false });

const orderSchema = new Schema<Order>({
  user_id: { type: String, ref: 'User', required: true },
  username: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pin: { type: String, required: true },
  total: { type: Number, required: true },
  orderDetails: [orderDetailSchema],
  orderDate: { type: Date, default: Date.now },
}, { versionKey: false });

const Order = model<Order>('Order', orderSchema);

export default Order;
