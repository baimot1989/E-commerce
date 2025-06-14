const Categories = require('../modelCollection/categoriesModel');

const getCategories = () => {
    return Categories.find();
}

const getCategoryById = (id) => {
    return Categories.findById(id);
};
const addCategory = (obj) => {
    const category = new Categories(obj);
    return category.save();
};
const updateCategory = (id, obj) => {
    return Categories.findByIdAndUpdate(id, obj);
}; 
const deleteCategory = (id) => {
    return Categories.findByIdAndDelete(id);
};

module.exports = {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
}
