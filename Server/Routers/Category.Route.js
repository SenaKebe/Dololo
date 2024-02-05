const express = require('express');
const  upload = require( '../config/multer');
const categoryRoutes = express.Router();

const categoryController = require('../controllers/category.controller');


categoryRoutes.get('/api/category',categoryController.getAllCategories)
categoryRoutes.get('/api/category/:id', categoryController.getSingleCategories)
categoryRoutes.put('/api/category/:id', categoryController.updateSingleCategory)
categoryRoutes.delete('/api/category/:id',categoryController.deleteSingleCategory)
categoryRoutes.post('/api/category',upload.single('image'), categoryController.createSingleCategory) 


module.exports = categoryRoutes;






