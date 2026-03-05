const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    pid: {
        type:       String,
        unique:     true,
        required:   true,
        trim:       true
    },
    hasImage: {
        type:       Boolean,
        unique:     false,
        required:   true
    },
    title: {
        type:       String,
        unique:     false,
        required:   true,
        trim:       true
    },
    name: {
        type:       String,
        unique:     false,
        required:   true,
        trim:       true
    },
    category: {
        type:       String,
        unique:     false,
        required:   true,
        trim:       true
    },
    price: {
        type:       Number,
        unique:     false,
        required:   true
    },
    stock: {
        type:       Number,
        unique:     false,
        required:   true
    },
    inCart: {
        type:       Boolean,
        unique:     false,
        required:   false
    },
    note: {
        type:       String,
        unique:     false,
        required:   false,
        trim:       true
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;