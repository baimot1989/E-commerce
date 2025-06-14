const productsRepo = require('../repositories/productsRepo')

const getAllProducts = () => {
    return productsRepo.getProducts();
}

const getProductById = (id) => {
    return productsRepo.getProductById(id);
 };
const addProduct = (obj) => {
    return productsRepo.addProduct(obj);
 };

 const updateProduct = (id, obj) => {
    return productsRepo.updateProduct(id, obj);
 };

 const deleteProduct = (id) => {
    return productsRepo.deleteProduct(id);
 };

module.exports = { getAllProducts , getProductById, addProduct, updateProduct, deleteProduct};