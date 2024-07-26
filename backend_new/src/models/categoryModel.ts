import { Schema, model, Document } from 'mongoose';

interface Category extends Document {
    udid: string;
    created_by: string;
    updated_by: string;
    created_date: Date;
    updated_date: Date;
    record_status: string;
    category_name: string;
}

const categorySchema = new Schema<Category>({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, required: true },
    category_name: { type: String, required: true }
},{ versionKey: false });

const Category = model<Category>('Category', categorySchema);

export default Category;
