const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
    {  
        categoryName: {type: String, require: true}
    },
    { versionKey: false }
);

const Categories = mongoose.model('category', categoriesSchema);

module.exports = Categories;