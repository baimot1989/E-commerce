const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv')
const connectDB = require('./dataBaseConfig/dataBaseConfig');
const cookieParser = require('cookie-parser');
const productController = require('./controllers/productController');
const usersController = require('./controllers/usersController');
const ordersController = require('./controllers/ordersController');
const categoriesController = require('./controllers/categoriesController');
const authUserController = require('./controllers/authUserController');
const { requireAuth } = require('./middleware/authRequire');

dotenv.config()
const app = express();
const port = 3000;

// // data base coonections
connectDB();

// Middleware
app.use(cookieParser())
app.use('/', express.json());
app.use(cors({
    origin: 'http://localhost:5173', //  React app's URL 
    credentials: true
}));

// Routs
app.use('/products', productController)
app.use('/users', requireAuth, usersController)
app.use('/orders', ordersController)
app.use('/categories', categoriesController)
app.use('/authUser',authUserController)
app.get('/', (req, res) => {
    try {
        res.send('Welcome to the e-comers')
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
})