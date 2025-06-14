const mongoose = require('mongoose');

 // Connect to MongoDB database
const connectDB = () => {
  mongoose
    .connect(`mongodb://127.0.0.1:27017/e-commerce`)
    .then(() => console.log('Connected to e-commerce'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;