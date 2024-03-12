const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the objects within the 'item' array
const itemSchema = new Schema({
    
    id: {
    type: Number,
    required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
});

// Define the main schema
const orderSchema = new Schema({
   
    items: {
      type: [itemSchema],
      required: true
    },
    total: {
      type: Number,
      required: true
    }
});

// Create a model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
