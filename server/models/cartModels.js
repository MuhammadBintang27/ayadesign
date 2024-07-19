const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: String, // Menyesuaikan dengan tipe data yang sesuai dengan kebutuhan
        required: true,
    },
});

const Cart = mongoose.model("Cart", cartSchema); // Nama model disesuaikan dengan "Cart"

module.exports = Cart;
