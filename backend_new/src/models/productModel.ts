import { Schema, model, Document } from 'mongoose';

interface Product extends Document {
    udid: string;
    created_by: string;
    updated_by: string;
    created_date: Date;
    updated_date: Date;
    record_status: string;
    product_name: string;
    description: string;
    product_image: string;
    ratings:number;
    price :number;
    category_id:string;
    subcategory_id:string;
    keywords:string;
    quantity:string;
    brand_id:string;
    origin:string;
}

const productSchema = new Schema<Product>({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, required: true },
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    product_image: { type: String, required: true },
    ratings: { type: Number, required: true },
    price: { type: Number, required: true },
    category_id: { type: String, required: true },
    subcategory_id: { type: String, required: true },
    keywords: { type: String, required: true },
    quantity: { type: String, required: true },
    brand_id: { type: String, required: true },
    origin: { type: String, required: true },
},{ versionKey: false });

const Product = model<Product>('Product', productSchema);

export default Product;
