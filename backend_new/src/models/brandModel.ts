import { Schema, model, Document } from 'mongoose';

interface Brand extends Document {
    udid: string;
    created_by: string;
    updated_by: string;
    created_date: Date;
    updated_date: Date;
    record_status: string;
    brand_name: string;
    description: string;
}

const brandSchema = new Schema<Brand>({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, required: true },
    brand_name: { type: String, required: true },
    description: { type: String, required: true }
},{ versionKey: false });

const Brand = model<Brand>('Brand', brandSchema);

export default Brand;
