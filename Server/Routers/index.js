const express = require('express');

const  appRoutes = express.Router();

// import ms routes
const categoryRoutes = require('./category.route');
const consumableRoutes = require('./consumable.route');
const userRoutes = require('./user.route');
/* const loginRoutes = require('./login.route'); 
const orderRoutes = require('./order.route');
 */
// include routes
appRoutes.use(categoryRoutes);
appRoutes.use(consumableRoutes);
 appRoutes.use(userRoutes);
/*
appRoutes.use(orderRoutes);
appRoutes.use(loginRoutes); */
 

module.exports = appRoutes;
