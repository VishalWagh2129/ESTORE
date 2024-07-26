const generateId = require('../utility/common');
const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const productId = await generateId('PRD');
        const { created_by, updated_by, record_status, description, product_name, product_image,brand_id, ratings, price, category_id,subcategory_id, keywords,quantity,origin } = req.body;
        const newProduct = new Product({
            udid: productId,
            created_by,
            updated_by,
            record_status,
            product_name,
            description,
            product_image,
            ratings,
            price,
            brand_id,
            category_id,
            keywords,
            subcategory_id,
            quantity,
            origin
        });
        const productData = await newProduct.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const { categoryid: mainCategoryId, subcategoryid: subCategoryId, keyword } = req.query;

        let query = {};

        if (subCategoryId) {
            query.subcategory_id = subCategoryId;
        }
        if (mainCategoryId) {
            // Assuming you have a way to fetch categories and subcategories
            const categories = await Product.find({ category_id: mainCategoryId });
            const categoryIds = categories.map(cat => cat.udid);
            query.category_id = { $in: categoryIds };
        }
        if (keyword) {
            query.keywords = { $regex: keyword, $options: 'i' };
        }
        const products = await Product.find(query);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a Product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ udid: id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { updated_by, record_status, product_name, description, product_image,brand_id,quantity, ratings, price, category_id,subcategory_id,origin, keywords } = req.body;
        const updatedProduct = await Product.findOneAndUpdate(
            { udid: id },
            {
                updated_by,
                updated_date: new Date(),
                record_status,
                product_name,
                description,
                product_image,
                ratings,
                price,
                category_id,
                keywords,
                subcategory_id,
                origin,
                brand_id,
                quantity
            },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findOneAndDelete({ udid: id });
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};