const productsRepo = require('../repositories/productsRepo')

const getAllProducts = () => {
   return productsRepo.getProducts();
}

const getProductById = (id) => {
   return productsRepo.getProductById(id);
};
const addProduct = async (obj) => {
   const newProduct = { ...obj, bought: 0 };
   return await productsRepo.addProduct(newProduct);
};

const updateProduct = (id, obj) => {
   return productsRepo.updateProduct(id, obj);
};

const deleteProduct = (id) => {
   return productsRepo.deleteProduct(id);
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };