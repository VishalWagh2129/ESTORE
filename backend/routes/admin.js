const express = require('express');
const pool = require('../shared/pool');
const admin = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const genrateId = require('../utility/common');


admin.post('/admin-signup', async (req, res) => {
    try {
        const adminId = await genrateId('ADM');
        const { username, mobile, email, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const query = `INSERT INTO admin_login(UDID,RECORD_STATUS, EMAIL_ID, USERNAME, PASSWORD, MOBILE) VALUES (?, 'ACTIVE', ?, ?, ?, ?)`;
        pool.query(query, [adminId, email, username, hashedPassword, mobile], (err, result) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Signup failed', error: err.message });
            } else {
                res.status(200).json({ success: true, message: 'Admin created successfully', data: result });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Signup failed', error: error.message });
    }
});


admin.post('/admin-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = 'SELECT * FROM admin_login WHERE EMAIL_ID = ?';
        pool.query(query, [email], async (err, results) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Login failed', error: err.message });
            } else {
                const user = results[0];
                if (!user) {
                    res.status(404).json({ success: false, message: 'User not found' });
                    return;
                }
                const isPasswordValid = await bcryptjs.compare(password, user.PASSWORD);
                if (isPasswordValid) {
                    const token = jwt.sign({
                        USER_TYPE: 'ADMIN', USERNAME: user.USERNAME,
                        LOGIN_TYPE: 'ADMIN', UDID: user.UDID, RECORD_STATUS: user.RECORD_STATUS, EMAIL: user.EMAIL_ID, MOBILE: user.MOBILE
                    }, 'mysecretkey', { expiresIn: '24h' });
                    res.status(200).json({ success: true, message: 'Login successful', data: token });
                } else {
                    res.status(401).json({ success: false, message: 'Invalid password' });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
});

admin.get('/getAdminDetails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'User Id is required' });
        }
        const query = `SELECT * FROM admin_login WHERE UDID = ?`;
        pool.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch User' });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ success: true, data: result[0] });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch User' });
    }
});

admin.put('/updateAdmin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, email } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Admin Id is required' });
        }
        const query = `UPDATE admin_login SET RECORD_STATUS = ?,USERNAME = ?, EMAIL_ID = ? WHERE UDID = ?`;
        pool.query(query, [status, name, email, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update Admin' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.status(200).json({ success: true, message: 'Admin updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Admin' });
    }
});

module.exports = admin;