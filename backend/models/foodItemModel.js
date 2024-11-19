const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diningHall: { type: String, required: true },
  image: { type: String },
  review: []
});

module.exports = mongoose.model('FoodItem', foodItemSchema);