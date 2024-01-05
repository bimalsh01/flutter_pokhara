const mongoose = require('mongoose');

const OrderModel = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    total: {
        type: Number,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    }

})

const Order = mongoose.model('Order', OrderModel);
module.exports = Order;
