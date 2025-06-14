const express = require('express');
const usersService = require('../services/usersService');
const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const users = await usersService.getAllUsers()
        res.json(users)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const user = await usersService.getUserById(id)
        res.json(user)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const obj = req.body;

    try {
        const resulte = await usersService.updateUser(id,obj)
        res.json(resulte)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const resulte = await usersService.deleteUser(id)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;