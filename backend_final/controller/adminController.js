const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateId = require('../utility/common');
const Admin = require('../models/adminModel');

exports.adminSignup = async (req, res) => {
    try {
        const adminId = await generateId('ADM');
        const { username, mobile, email, password } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newAdmin = new Admin({
            udid: adminId,
            created_by: adminId,
            updated_by: adminId,
            username,
            mobile,
            email,
            password: hashedPassword
        });

        const savedAdmin = await newAdmin.save();
        res.status(201).json({ success: true, message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Signup failed', error: error.message });
    }
};


exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({
                USER_TYPE: 'ADMIN',
                USERNAME: user.username,
                LOGIN_TYPE: 'ADMIN',
                UDID: user.udid,
                RECORD_STATUS: user.record_status,
                EMAIL: user.email,
                MOBILE: user.mobile
            }, 'mysecretkey', { expiresIn: '24h' });

            res.status(200).json({ success: true, message: 'Login successful', data: token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
};

exports.getAdminDetails = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'User Id is required' });
        }
        const admin = await Admin.findOne({ udid: id });
        if (!admin) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: true, data: admin });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch User', message: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, email } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Admin Id is required' });
        }
        const result = await Admin.updateOne(
            { udid: id },
            { username: name, record_status: status, email: email }
        );
        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(200).json({ success: true, message: 'Admin updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Admin', message: error.message });
    }
};
