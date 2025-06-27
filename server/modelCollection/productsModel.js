const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {type: String, require: true},
        category: {type: String, require: true},
        price: {type: Number, require: true},
        description: String,
        imagesSrc: [],
        inStock: Number,
        bought: Number,
        boughtBy: []
    },
    { versionKey: false }
);

const Products = mongoose.model('product', productSchema);

module.exports = Products;