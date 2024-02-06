const express = require('express');
const orderRoutes = express.Router();

const orderController = require('../controllers/order.controller');

// include routes
orderRoutes.get('/api/order/',orderController.getAllorder);
orderRoutes.get('/api/orderInfo',orderController.getAllorderInfo);
orderRoutes.get('/api/order/:id',orderController.getSingleategory);
orderRoutes.put('/api/order/:id',orderController.updateorder);
orderRoutes.delete('/api/order/:id',orderController.deleteorder);
orderRoutes.post('/api/order',orderController.createorder);
orderRoutes.get('/api/orderBycategory/:id',orderController.getAllorderByCategory);
orderRoutes.get('/api/order-sum',orderController.getAllorderSum);
orderRoutes.get('/api/order-sum-detaile/:id',orderController.getAllorderSumdetaile);
orderRoutes.get('/api/deletedorder',orderController.getDeletedOrder);
module.exports =orderRoutes;