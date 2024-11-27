const User = require('./userModel');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Create User
exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password, type } = req.body;

        if (!email || !fullName || !password || !type) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (!['employee', 'admin'].includes(type)) {
            return res.status(400).json({ message: 'Type must be "employee" or "admin".' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        const user = new User({ fullName, email, password, type });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        // Ensure email is provided (email is used to find the user)
        if (!email) {
            return res.status(400).json({ message: 'Email is required for updating user.' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update fields
        if (fullName) user.fullName = fullName;
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Ensure email is provided
        if (!email) {
            return res.status(400).json({ message: 'Email is required for deleting user.' });
        }

        // Delete user
        const result = await User.deleteOne({ email });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        // Retrieve all users (excluding sensitive data like passwords)
        const users = await User.find({}, { password: 0 }); // Excludes passwords from results
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Upload Image
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded. Please upload a valid image file.' });
        }

        // Example: Saving file path to a user (assuming the email is provided)
        const { email } = req.body;
        if (!email) {
            // If no email is provided, you could delete the uploaded file to avoid orphaned files
            fs.unlink(path.join(__dirname, './images', req.file.filename), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
            return res.status(400).json({ message: 'Email is required to associate an image.' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // Delete uploaded image if user is not found
            fs.unlink(path.join(__dirname, './images', req.file.filename), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
            return res.status(404).json({ message: 'User not found.' });
        }

        // Save image path to user and update
        user.imagePath = req.file.path;
        await user.save();

        res.status(200).json({ message: 'Image uploaded successfully', filePath: req.file.path });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Example logic for finding a user and verifying credentials
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Assuming bcrypt is used for hashing passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user }); // Or respond with a token, etc.
};

// Example company controller function
exports.getAllCompanies = (req, res) => {
    // You can replace this with your actual database query logic
    const companies = [
        { id: 1, name: 'Google', imageUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' },
        { id: 2, name: 'NVIDIA', imageUrl: 'https://cdn.pushcrew.com/img/logos/a163ceea8f15b516e29bb9f01b8d31dc/e3b4d0b4-fd89-4750-9e47-fa21a6473012.png' },
        { id: 3, name: 'Microsoft', imageUrl: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' }
    ];

    res.status(200).json(companies);
};
