export interface Product {
    _id: number;
    product_name: string;
    product_image: string;
    price: number;
    ratings: number;
    description: string;
    category_id: string;
    subcategory_id:string;
    udid:string;
    brand_id:string;
    created_by:string;
    updated_by:string;
    keywords:string;
    origin:string;
    quantity:number;
    record_status:string;
    created_date:Date;
    updated_date:Date;
}