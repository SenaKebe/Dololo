const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/login.controller');

// Login route
loginRouter.post('/api/login', loginController.getUserByUserName);

module.exports = loginRouter;



