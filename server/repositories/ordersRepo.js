const Orders = require('../modelCollection/ordersModel');

const getOrders = () => {
    return Orders.find();
}

const getOrderById = (id) => {
    return Orders.findById(id);
};
const addOrder = (obj) => {
    const order = new Orders(obj);
    return order.save();
};
const updateOrder = (id, obj) => {
    return Orders.findByIdAndUpdate(id, obj);
}; 
const deleteOrder = (id) => {
    return Orders.findByIdAndDelete(id);
};

module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
}

