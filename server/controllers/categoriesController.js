const express = require('express');
const categoriesService = require('../services/categoriesService');
const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const categories = await categoriesService.getAllCategories()
        res.json(categories)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const category = await categoriesService.getCategoryById(id)
        res.json(category)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/', async (req,res) => {
    const obj = req.body;
    try {
        const resulte = await categoriesService.addCategory(obj)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const obj = req.body;

    try {
        const resulte = await categoriesService.updateCategory(id,obj)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const resulte = await categoriesService.deleteCategory(id)
        res.json(resulte)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;