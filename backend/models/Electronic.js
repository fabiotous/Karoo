const Product = require("./Product");
const mongoose = require('mongoose');

const Electronic = Product.discriminator('Electronic', new mongoose.Schema({
    brand: {type: String}
}));

module.exports = mongoose.model('Electronic');