const express = require('express');
const consumableRoutes = express.Router();
const  upload = require( '../config/multer');
const consumableController = require('../controllers/consumable.controller');


consumableRoutes.get('/api/consumable',consumableController.getAllConsumables);
consumableRoutes.get('/api/consumable/:id',consumableController.getSingleConsumableById); 
consumableRoutes.get('/api/consumableByCategory/:id',consumableController.getConsumableByCategory);
consumableRoutes.get('/api/consumableByUser/:id',consumableController.getConsumableByUser);
consumableRoutes.put('/api/consumable/:id',consumableController.updateSingleConsumable);
consumableRoutes.delete('/api/consumable/:id',consumableController.deleteSingleConsumable)
consumableRoutes.put('/api/consumable/',upload.single('image'),consumableController.createSingleConsumable);



module.exports = consumableRoutes;
