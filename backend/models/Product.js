const mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'productType'
};

const Product = mongoose.model('product', new mongoose.Schema({
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
    note: {
        type:       String,
        unique:     false,
        required:   false,
        trim:       true
    }
}, baseOptions,));

module.exports = Product;
