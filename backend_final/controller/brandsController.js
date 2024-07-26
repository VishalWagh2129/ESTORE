const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateId = require('../utility/common');
const Brand = require('../models/brandModel');

// Create a new Brand
exports.createBrand = async (req, res) => {
    try {
        const brandId = await generateId('BRD');
        const { created_by, updated_by, record_status,description, brand_name } = req.body;
        const newBrand = new Brand({
            udid: brandId,
            created_by,
            updated_by,
            record_status,
            brand_name,
            description
        });
        await newBrand.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Brands
exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json({ success: true, data: brands });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a brand by ID
exports.getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findOne({udid:id});
        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        res.status(200).json({ success: true, data: brand });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a brand by ID
exports.updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { updated_by, record_status, brand_name,description } = req.body;
        const updatedBrand = await Brand.findOneAndUpdate(
            {udid:id},
            {
                updated_by,
                updated_date: new Date(),
                record_status,
                brand_name,
                description
            },
            { new: true }
        );
        if (!updatedBrand) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Brand.findOneAndDelete({udid:id});
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllActiveBrands = async (req, res) => {
    try {
        const brands = await Brand.find({record_status:'ACTIVE'});
        res.status(200).json({ success: true, data: brands });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};