const ordersRepo = require('../repositories/ordersRepo')

const getAllOrders = () => {
    return ordersRepo.getOrders();
}

const getOrderById = (id) => {
    return ordersRepo.getOrderById(id);
 };
const addOrder = (obj) => {
    return ordersRepo.addOrder(obj);
 };

 const updateOrder = (id, obj) => {
    return ordersRepo.updateOrder(id, obj);
 };

 const deleteOrder = (id) => {
    return ordersRepo.deleteOrder(id);
 };

module.exports = { getAllOrders , getOrderById, addOrder, updateOrder, deleteOrder};