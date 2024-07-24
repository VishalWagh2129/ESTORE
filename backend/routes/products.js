const express = require('express');
const products = express.Router();
const pool = require("../shared/pool");

products.get('/getAllProducts', (req, res) => {
    var mainCategoryId = req.query.maincategoryid;
    var subCategoryId = req.query.subcategoryid;
    var keyword = req.query.keyword;
    let query = 'select * from products';
    if (subCategoryId) {
        query += ' where category_id = ' + subCategoryId;
    }

    if (mainCategoryId) {
        query = `select products.* from products, categories 
    where products.category_id = categories.id and categories.parent_category_id = ${mainCategoryId}`;
    }

    if (keyword) {
        query += ` and keywords like '%${keyword}%'`;
    }
    pool.query(query, (error, products) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(products);
        }
    });
});

products.get('/getProductById/(:id)', (req, res) => {
    let id = req.params.id;
    pool.query('select * from products where id = ' + id, (error, products) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(products);
        }
    });
});

products.post('/add-product', async (req, res) => {
    try {
        const productId = await genrateId('PROD');
        const { name, createdBy, updatedBy, status, description, price, ratings, brand, origin, image } = req.body;
        const buffer = Buffer.from(image.split(',')[1], 'base64');
        const query = `INSERT INTO new_products (UDID,CREATED_BY,UPDATED_BY,CREATED_DATE,UPDATED_DATE, RECORD_STATUS, NAME, DESCRIPTION, PRICE, RATINGS, BRAND, ORIGIN_COUNTRY,IMAGE) VALUES (?, ?, ?,NOW(),NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [productId, createdBy, updatedBy, status, name, description, price, ratings, brand, origin, buffer], (err, result) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Product creation failed', error: err.message });
            } else {
                res.status(200).json({ success: true, message: 'Product created successfully', data: result });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Product creation failed', error: error.message });
    }
});

products.put('/updateProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, createdBy, updatedBy, status, description, price, ratings, products, origin, image } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        const query = `UPDATE new_products SET CREATED_BY = ?, UPDATED_BY = ?, CREATED_DATE = NOW(), UPDATED_DATE = NOW(),RECORD_STATUS = ?,NAME = ?, DESCRIPTION = ?,PRICE = ?,RATINGS = ?,BRAND = ?,ORIGIN_COUNTRY = ?,IMAGE = ? WHERE UDID = ?`;
        pool.query(query, [createdBy, updatedBy, status, name, description, price, ratings, products, origin, image, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update Product' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json({ success: true, message: 'Product updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Product' });
    }
});

// Delete brand by ID
products.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        const query = `DELETE FROM new_products WHERE UDID = ?`;
        pool.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete Product' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json({ success: true, message: 'Product deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Product' });
    }
});

module.exports = products;