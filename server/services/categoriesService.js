const categoriesRepo = require('../repositories/categoriesRepo')

const getAllCategories = () => {
    return categoriesRepo.getCategories();
}

const getCategoryById = (id) => {
    return categoriesRepo.getCategoryById(id);
 };
const addCategory = (obj) => {
    return categoriesRepo.addCategory(obj);
 };

 const updateCategory = (id, obj) => {
    return categoriesRepo.updateCategory(id, obj);
 };

 const deleteCategory = (id) => {
    return categoriesRepo.deleteCategory(id);
 };

module.exports = { getAllCategories , getCategoryById, addCategory, updateCategory, deleteCategory};