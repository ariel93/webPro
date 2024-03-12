const express = require('express');
const adminAuthMiddleware =require('../middlewares/adminAuthMiddleware');
const router = express.Router();
const orderController = require('./orderController');

// Create a new user
router.post('/', orderController.createOrder);

// Get all users
router.get('/all',adminAuthMiddleware, orderController.getAllOrders);

// Get a user by ID
router.get('/:id', orderController.getOrderById);

// Delete a 
router.delete('/:id', orderController.deleteOrder);

module.exports = router;