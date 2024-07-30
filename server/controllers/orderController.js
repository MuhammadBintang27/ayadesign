const Cart = require('../models/cartModels');
const User = require('../models/userModels'); // Ensure you have a User model
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const verifyTokenAndGetUserId = (token) => {
    try {
        const decoded = jwt.verify(token, 'secretkey123'); // Pastikan kunci rahasia sesuai
        return decoded._id;
    } catch (error) {
        return null;
    }
};

exports.addToCart = async (req, res) => {
    try {

        const { title, name, description, imageUrl, price, user_id } = req.body;

        // Check if the user ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Convert user_id to ObjectId
        const userIdObj = mongoose.Types.ObjectId(user_id);

        // Find the user by ID
        const user = await User.findById(userIdObj);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Create a new cart item
        const newCart = new Cart({
            title,
            name,
            description,
            imageUrl,
            price,
            user: userIdObj // Associate cart item with user ID
        });

        // Save the cart item
        await newCart.save();
        console.log('New cart item saved:', newCart);

        // Update the user's cart
        user.cart.push(newCart._id);
        await user.save();

        console.log('User cart updated:', user.cart);

        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error in addToCart:', error); // Log the error
        res.status(400).json({ error: error.message });
    }
};



// Fetch cart items for a specific user
exports.getItemCart = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token and extract user ID
        const userId = verifyTokenAndGetUserId(token);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const cartItems = await Cart.find({ user: userId });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token and extract user ID
        const userId = verifyTokenAndGetUserId(token);
        if (!userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { id } = req.params;
        const deletedItem = await Cart.findOneAndDelete({ _id: id, user: userId });
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Checkout
exports.checkout = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token and extract user ID
        const userId = verifyTokenAndGetUserId(token);
        if (!userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Check if cart has items for the user
        const cartItems = await Cart.find({ user: userId });
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty, cannot proceed to checkout' });
        }

        // Clear the cart for the user
        await Cart.deleteMany({ user: userId });
        res.status(200).send('Checkout successful and cart cleared');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
