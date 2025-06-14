const Products = require('../modelCollection/productsModel');

const getProducts = () => {
    return Products.find();
}

const getProductById = (id) => {
    return Products.findById(id);
};
const addProduct = (obj) => {
    const Product = new Products(obj);
    return Product.save();
};
const updateProduct = (id, obj) => {
    return Products.findByIdAndUpdate(id, obj);
}; 
const deleteProduct = (id) => {
    return Products.findByIdAndDelete(id);
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}

