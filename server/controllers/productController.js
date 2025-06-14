const express = require('express');
const productsService = require('../services/productsService');
const router = express.Router();
const { requireAuth } =  require('../middleware/authRequire')

// router.use(('/'), requireAuth)

router.get('/',  async (req,res) => {
    try {
        const products = await productsService.getAllProducts()
        res.json(products)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const product = await productsService.getProductById(id)
        res.json(product)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/', async (req,res) => {
    const obj = req.body;
    try {
        const resulte = await productsService.addProduct(obj)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const obj = req.body;

    try {
        const resulte = await productsService.updateProduct(id,obj)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const resulte = await productsService.deleteProduct(id)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;