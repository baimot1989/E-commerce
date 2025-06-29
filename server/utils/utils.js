const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    })
};


function orderNumber() {
    const max = 9999999; // 7 digits max
    return Math.floor(Math.random() * (max + 1));
  }

const getDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();

    const date = `${day}/${month}/${year}`;
    return date
};




module.exports = { getDate, createToken, orderNumber }