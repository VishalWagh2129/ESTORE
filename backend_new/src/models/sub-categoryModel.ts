import { Schema, model, Document } from 'mongoose';

interface SubCategory extends Document {
    udid: string;
    category_id:string;
    created_by: string;
    updated_by: string;
    created_date: Date;
    updated_date: Date;
    record_status: string;
    subcategory_name: string;
}

const categorySchema = new Schema<SubCategory>({
    udid: { type: String, required: true, unique: true },
    category_id: { type: String, required: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, required: true },
    subcategory_name: { type: String, required: true }
},{ versionKey: false });

const SubCategory = model<SubCategory>('SubCategory', categorySchema);

export default SubCategory;
