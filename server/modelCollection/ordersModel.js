const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
    {
        orderNumber: {type: Number, require: true},
        customerFullName: {type: String, require: true},
        data: {type: String, require: true},
        productsList: {type: [
            {productName: String,
                quantity: {type: Number, require: true},
                price: {type: String, require:true},
                total: {type: String, require:true},
                date: {type: String, require:true},
            }
        ]},
    },
    { versionKey: false }
);

const Orders = mongoose.model('order', ordersSchema);

module.exports = Orders;