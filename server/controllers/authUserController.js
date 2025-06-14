const express = require('express');
const usersService = require('../services/usersService');
const router = express.Router();

router.post('/singup', async (req,res) => {
    const obj = req.body;
    try {
        const resulte = await usersService.addUser(obj)
        console.log(resulte)
        res.json(resulte)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
})
router.post('/login', async (req,res) => {
    const {userName, password} = req.body;
    try {
        const {user, token} = await usersService.loginUser(userName, password);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60*60, secure: false, sameSite: 'Lax'});
        res.json(user)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true, // use only if using https
        sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;