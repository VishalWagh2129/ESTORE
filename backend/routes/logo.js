const express = require('express');
const pool = require('../shared/pool');
const logo = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const genrateId = require('../utility/common');

logo.post('/saveLogo',async (req, res) => {
    try {
        const logId = await genrateId('LOG');
        const { createdBy,updatedBy,image } = req.body;
        const buffer = Buffer.from(image.split(',')[1], 'base64');
        const query = `INSERT INTO logo (UDID,CREATED_BY,UPDATED_BY,CREATED_DATE,UPDATED_DATE, RECORD_STATUS, LOGO) VALUES (?, ?, ?,NOW(),NOW(),'ACTIVE', ?)`;
        pool.query(query, [logId,createdBy,updatedBy,buffer], (err, result) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Image creation failed', error: err.message });
            } else {
                res.status(200).json({ success: true, message: 'Image Uploaded successfully', data: result });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Image Upload failed', error: error.message });
    }
});

logo.get('/getAllLogo', async (req, res) => {
    try {
        const query = `SELECT * FROM logo WHERE RECORD_STATUS = 'ACTIVE'`;
        pool.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Failed to fetch Logo', error: err.message });
            }
            res.status(200).json({ success: true, message: 'Successfully fetched Logo', data: results });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
});


module.exports = logo;