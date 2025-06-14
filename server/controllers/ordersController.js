const express = require('express');
const orderService = require('../services/orderService');
const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const orders = await orderService.getAllOrders()
        res.json(orders)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const order = await orderService.getOrderById(id)
        res.json(order)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/', async (req,res) => {
    const obj = req.body;
    try {
        const resulte = await orderService.addOrder(obj)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const obj = req.body;

    try {
        const resulte = await orderService.updateOrder(id,obj)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const resulte = await orderService.deleteOrder(id)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;