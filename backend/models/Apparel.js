const Product = require("./Product");
const mongoose = require('mongoose');

const Apparel = Product.discriminator('Apparel', new mongoose.Schema({
    brand: {type: String}
}));

module.exports = mongoose.model('Apparel');