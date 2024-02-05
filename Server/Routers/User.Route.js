const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/user.controller');

userRoutes.get('/api/user',userController.getAllUsers);
userRoutes.get('/api/user',userController.getSingleUser);
userRoutes.get('/api/usersInfo',userController.getAllUsersInfo);
userRoutes.get('/api/user/:id',userController.getSingleUser);
userRoutes.put('/api/user/:id',userController.updateSingleUser);
userRoutes.post('/api/user',userController.registerSingleUser);
userRoutes.delete('/api/user/:id',userController.deleteSingleUser);

module.exports =userRoutes;