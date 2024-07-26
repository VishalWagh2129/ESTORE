const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateId = require('../utility/common');


// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { udid, created_by, updated_by, created_date, updated_date, record_status, state, pin, city, address, email, firstname, lastname, password } = req.body;
        const newUser = new User({
            udid,
            created_by,
            updated_by,
            created_date,
            updated_date,
            record_status,
            state,
            pin,
            city,
            address,
            email,
            firstname,
            lastname,
            password
        });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error });
    }
};

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, address, city, state, pin, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const udid = await generateId('USR'); // Generate unique ID
        const newUser = new User({
            udid,
            firstname:firstName,
            lastname:lastName,
            created_by:udid,
            updated_by:udid,
            address,
            city,
            state,
            pin,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'success' });
    } catch (error) {
        res.status(400).json({ error: error.code, message: error.message });
    }
};

exports.login = async (req, res) => {
    console.log('ab');
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign(
                { id: user.udid, email: user.email },
                'estore-secret-key',
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token,
                expiresInSeconds: 3600,
                user: {
                    firstName: user.firstname,
                    lastName: user.lastname,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    pin: user.pin,
                    udid: user.udid
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        res.status(400).json({  error: error.code,message: error.message });
    }
};

exports.getAllCustomers = async (req,res)=>{
    try {
        const users = await User.find({ record_status: 'ACTIVE' });
        if (users.length === 0) {
            return res.status(404).json({ message: 'No customers found' });
        }
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getCustomerById = async (req,res)=>{
    try {
        const customerId = req.params.id;
        const user = await User.findOne({ udid: customerId, record_status: 'ACTIVE' });
        if (!user) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}