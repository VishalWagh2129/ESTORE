const express = require('express');
const pool = require('../shared/pool');
const wishlist = express.Router();
const genrateId = require('../utility/common');

wishlist.post('/addToWishlist', async (req, res) => {
    try {
        console.log(req.body);
        const { createdBy, updatedBy, status, user_id, product_id } = req.body;
        const wishlistId = await genrateId('WHT');
        const query = `INSERT INTO wishlist (udid,created_by,updated_by,created_date,updated_date,record_status, user_id, product_id) VALUES (?, ?, ?, NOW(),NOW(),? ,? ,?)`;

        pool.query(query, [wishlistId, createdBy, updatedBy, status, user_id, product_id], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Unsuccessful saving wishlist', error: err.message });
            }
            res.status(200).json({ success: true, message: 'wishlist created successfully', data: result });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unsuccessful saving wishlist', error: error.message });
    }
});

// Get all wishlist
wishlist.get('/getAllWishlist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const query = `SELECT * FROM wishlist WHERE record_status = 'ACTIVE' AND user_id = ?`;
        pool.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch wishlist' });
            }
            res.status(200).send(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
});


// Get wishlist by user ID and product ID
wishlist.get('/getWishlistById/:user_id/:product_id', async (req, res) => {
    try {
        const { user_id, product_id } = req.params;
        if (!user_id || !product_id) {
            return res.status(400).json({ error: 'User ID and Product ID are required' });
        }
        const query = `SELECT * FROM wishlist WHERE user_id = ? AND product_id = ? AND record_status = 'ACTIVE'`;
        pool.query(query, [user_id, product_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch wishlist' });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: 'Wishlist not found' });
            }
            res.status(200).json({ success: true, data: result[0] });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
});


// Update wishlist by ID
wishlist.put('/updateWishlist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, createdBy, updatedBy, status, description } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'wishlist ID is required' });
        }
        const query = `UPDATE wishlist SET CREATED_BY = ?, UPDATED_BY = ?, CREATED_DATE = NOW(), UPDATED_DATE = NOW(),RECORD_STATUS = ?,USER_ID = ?, PRODUCT_ID = ? WHERE UDID = ?`;
        pool.query(query, [createdBy, updatedBy, status, name, description, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update wishlist' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'wishlist not found' });
            }
            res.status(200).json({ success: true, message: 'wishlist updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update wishlist' });
    }
});

wishlist.delete('/deleteWishlist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Wishlist ID is required' });
        }
        const query = `UPDATE wishlist SET RECORD_STATUS = 'delete' WHERE UDID = ?`;
        pool.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update wishlist' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Wishlist not found' });
            }
            res.status(200).json({ success: true, message: 'Wishlist updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update wishlist' });
    }
});


module.exports = wishlist;
