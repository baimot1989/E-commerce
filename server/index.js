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
const paymentController = require('./controllers/paymentController');
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
    origin: true,
    credentials: true
}));

 

// Routs
app.use('/products', productController)
app.use('/payment', paymentController)
app.use('/users', usersController)
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

app.listen(port,"0.0.0.0", () => {

    console.log(`app is listening at http://localhost:${port}`);
})