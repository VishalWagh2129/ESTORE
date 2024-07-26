import { generateId } from '../shared/common';
import Category from '../models/categoryModel';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const catgoryId = await generateId('CAT');
        const { created_by, updated_by, record_status, category_name } = req.body;
        const newCategory = new Category({
            udid: catgoryId,
            created_by,
            updated_by,
            record_status,
            category_name
        });
        const savedCategory = await newCategory.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findOne({udid:id});
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { updated_by, record_status, category_name } = req.body;
        const updatedCategory = await Category.findOneAndUpdate(
            {udid:id},
            {
                updated_by,
                updated_date: new Date(),
                record_status,
                category_name
            },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findOneAndDelete({udid:id});
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllActiveCategories = async (req, res) => {
    try {
        const categories = await Category.find({record_status:'ACTIVE'});
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
