const Cart = require('../models/cartModels');

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { title, name, description, imageUrl, price } = req.body;
        const newCart = new Cart({ title, name, description, imageUrl, price });
        await newCart.save();
        res.status(201).send(newCart);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Fetch all cart items
exports.getItemCart = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).send(cartItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Cart.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(deletedItem);
    } catch (error) {
        console.error('Error removing item:', error); // Debugging
        res.status(500).json({ message: error.message });
    }
};




// Checkout
exports.checkout = async (req, res) => {
    try {
        // Implement checkout logic here, e.g., creating an order, processing payment, etc.
        await Cart.deleteMany(); // Clear the cart after checkout
        res.status(200).send('Checkout successful and cart cleared');
    } catch (error) {
        res.status(500).send(error.message);
    }
}
