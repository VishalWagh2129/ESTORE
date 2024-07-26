import { generateId } from '../shared/common';
import SubCategory from '../models/sub-categoryModel';

// Create a new category
export const createSubCategory = async (req, res) => {
    try {
        const subcategoryId = await generateId('SUBC');
        const {  category_id, created_by, updated_by, record_status, subcategory_name } = req.body;
        const newCategory = new SubCategory({
            udid:subcategoryId,
            category_id,
            created_by,
            updated_by,
            record_status,
            subcategory_name
        });
        const savedCategory = await newCategory.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all categories
export const getAllSubCategories = async (req, res) => {
    try {
        const categories = await SubCategory.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a category by ID
export const getSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await SubCategory.findOne({ udid: id });
        if (!category) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category by ID
export const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_id, updated_by, record_status, subcategory_name } = req.body;
        const updatedCategory = await SubCategory.findOneAndUpdate(
            { udid: id },
            {
                category_id,
                updated_by,
                updated_date: new Date(),
                record_status,
                subcategory_name
            },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a category by ID
export const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await SubCategory.findOneAndDelete({ udid: id });
        if (!deletedCategory) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }
        res.status(200).json({ message: 'SubCategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
