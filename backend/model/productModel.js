const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type : String,
        required : true
    },
    productPrice:{
        type : Number,
        required : true
    },
    productDescription:{
        type : String,
        required : true
    },
    productCategory:{
        type : String,
        required : true
    },
    productImageUrl:{
        type : String,
        required : true
    }
})

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;

