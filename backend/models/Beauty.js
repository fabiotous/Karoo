const Product = require("./Product");
const mongoose = require('mongoose');

const Beauty = Product.discriminator('Beauty', new mongoose.Schema({
    brand: {type: String}
}));

module.exports = mongoose.model('Beauty');